import uuid
from typing import Optional
import json

from backend.config import settings
from order.models import Order
from utils.service import Service
from utils.client import client_session
from utils.repository import Repository
from .client import NOVAClient
from order.enums import Company, CacheType
from .util import NOVAUtil
from base.redis_manager import redis_manager


class NOVAService(Service):
    CACHE_EXPIRATION_TIME = 14400

    def __init__(
        self,
        order_repo: Repository,
        order_item_repo: Repository,
        nova_order_repo: Repository,
        delivery_company_repo: Repository,
    ):
        self.company=Company.NOVA,
        self.client=NOVAClient,
        self.util=NOVAUtil
        self.order_repo = order_repo
        self.order_item_repo = order_item_repo
        self.nova_order_repo = nova_order_repo
        self.delivery_company_repo = delivery_company_repo

    def get_cache_data(self, type: CacheType) -> Optional[list]:
        data = redis_manager.get_string_data(f"{self.company}-{type}-cache")
        return json.loads(data) if data else None

    def get_localities(self) -> Optional[list]:
        localities = self.get_cache_data(CacheType.LOCALITIES)
        return localities

    def get_points(self) -> Optional[list]:
        points = self.get_cache_data(CacheType.POINTS)
        return points

    def get_cache_status(self, type: CacheType) -> Optional[int]:
        time_to_expire = redis_manager.ttl(f"{self.company}-{type}-cache")
        if time_to_expire == -2:
            return None
        return time_to_expire

    def localities_cache_status(self) -> Optional[int]:
        time = self.get_cache_status(CacheType.LOCALITIES)
        return time
    
    def points_cache_status(self) -> Optional[int]:
        time = self.get_cache_status(CacheType.POINTS)
        return time

    def cache_data(self, type: CacheType, data: list) -> None:
        data = json.dumps(data)
        redis_manager.cache_string_data(f"{self.company}-{type}-cache", data, self.CACHE_EXPIRATION_TIME)

    def cache_localities(self) -> Optional[list]:
        data = self.get_localities()
        if data:    
            return None
        data = self.get_all_localities()
        self.cache_data(CacheType.LOCALITIES, data)
        return data

    def cache_points(self) -> Optional[list]:
        data = self.get_points()
        if data:
            return None
        data = self.get_all_points()
        self.cache_data(CacheType.POINTS, data)
        return data

    @client_session
    def get_all_localities(self) -> Optional[list[dict]]:
        data = []
        for page in range(1, 72):
            d = self.client.fetch_localities(page)
            data_len = len(d.get('data'))
            if not data_len:
                while True:
                    d = self.client.fetch_localities(page)
                    data_len = len(d.get('data'))
                    if data_len:
                        break
            if d:
                clean_data = self.util.process_locality_data(d)
                data.extend(clean_data)
                continue
            return None
        return data

    @client_session
    def get_all_points(self) -> Optional[list[dict]]:
        data = []
        for page in range(1, 84):
            d = self.client.fetch_points(page)
            data_len = len(d.get('data'))
            if not data_len:
                while True:
                    d = self.client.fetch_points(page)
                    data_len = len(d.get('data'))
                    if data_len:
                        break
            if d:
                clean_data = self.util.process_point_data(d)
                data.extend(clean_data)
                continue
            return None
        return data


    @client_session
    def check_order_price(self, body: dict) -> Optional[dict]:
        data = self.client.check_price(
            city_recipient_ref=body.get("cityRecipient"),
            weight=body.get("weight"),
            cost=body.get("cost")
        )
        if data is None or not data.get("success"):
            return None
        data = data.get("data")[0]
        cost = data.get("Cost")
        cost_redelivery = data.get("CostRedelivery")
        return int(cost), int(cost_redelivery)

    def get_order(self, delivery_id: uuid.UUID) -> Optional[dict]:
        data = self.nova_order_repo().select_one_by_id(delivery_id)
        return data

    @client_session
    def track_ttn(self, ttn: int) -> Optional[dict]:
        data = self.client.track_ttn(ttn)
        if not data.get("success"):
            return None
        data = data.get("data")[0]
        # print("CLEAR_DATA", data)
        nova_status = data.get("Status")
        # print("NOVA_STATUS", nova_status)
        nova_status_code = data.get("StatusCode")
        # print("NOVA_STATUS_COD", nova_status_code) # DEVELOPMENT
        status = self.util.status.get(nova_status_code)
        # print("STATUS", status)
        data = {
            "ttn": ttn,
            "status": status,
            "novaStatus": nova_status,
            "novaStatusCode": nova_status_code
        }
        # print("FINAL_DATA", data)
        return data

    @client_session
    def create_order(
        self,
        body: dict
        ) -> Optional[dict]:
        try:
            recipient_counterparty_data = self.client.create_counterparty(
                body.get("recipientFirstName"),
                body.get("recipientLastName"),
                body.get("recipientPhone"),
                body.get("cityRecipient")
            )
            if not recipient_counterparty_data.get("success"):
                return None
            recipient_counterparty_data = recipient_counterparty_data.get("data")[0]
            recipient_counterparty_ref = recipient_counterparty_data.get("Ref")
            recipient_contact_ref = recipient_counterparty_data["ContactPerson"]["data"][0]["Ref"]
            data = self.client.create_order(
                weight=body.get("weight"),
                description=body.get("description"),
                cost=body.get("cost"),
                city_recipient=body.get("cityRecipient"),
                recipient=recipient_counterparty_ref,
                recipient_address=body.get("recipientAddress"),
                contact_recipient=recipient_contact_ref,
                recipient_phone=body.get("recipientPhone"),
                redelivery_string=body.get("redeliveryString")
            )
            if not data.get("success"):
                return None
            ttn = data.get("data")[0]["IntDocNumber"]
            shipping_price, cost_redelivery = self.check_order_price(body)
            delivery_company_obj = self.delivery_company_repo().select_one_by_prefix(Company.NOVA)
            delivery_id = self.nova_order_repo().create_one(
                shippingPrice=shipping_price,
                deliveryCompanyId=delivery_company_obj.id,
                ttn=int(ttn),
                weight=body.get("weight"),
                description=body.get("description"),
                cost=body.get("cost"),
                citySender=settings.NOVA_CITY_SENDER,
                sender=settings.NOVA_SENDER_COUNTERPARTY_REF,
                senderAddress=settings.NOVA_SENDER_ADDRESS,
                contactSender=settings.NOVA_SENDER_CONTACT_REF,
                senderPhone=settings.NOVA_PHONE_NUMBER,
                cityRecipient=body.get("cityRecipient"),
                recipient=recipient_counterparty_ref,
                recipientAddress=body.get("recipientAddress"),
                contactRecipient=recipient_contact_ref,
                recipientPhone=body.get("recipientPhone"),
                redeliveryString=body.get("redeliveryString"),
                recipientBankCard=settings.NOVA_BANK_CARD,
                recipientFirstName=body.get("recipientFirstName"),
                recipientLastName=body.get("recipientLastName"),
                costRedelivery=cost_redelivery,
                profit=body.get("cost") - cost_redelivery
            )
            order_id = self.order_repo().create_one(
                price=body.get("cost"),
                deliveryCompanyId=delivery_company_obj.id,
                deliveryId=delivery_id,
            )
            self.nova_order_repo().update_one(orderId=order_id)
            for item in body.get("items"):
                self.order_item_repo().create_one(
                    orderId=order_id,
                    totalPrice=item.itemPrice * item.quantity,
                    totalWeight=item.weight * item.quantity,
                    **item.model_dump()
                    )
            data = self.nova_order_repo().select_one_by_id(delivery_id)
            return data
        except Exception as e:
            # print(str(e))
            return None

    @client_session
    def update_statuses(self, orders: list[dict]) -> int:
        update_statuses_count = 0
        nova_delivery_company_id = self.delivery_company_repo().select_one_by_prefix(Company.NOVA)
        for order in orders["data"]:
            if order.deliveryCompanyId == nova_delivery_company_id.id:
                # print("POCO")
                delivery_obj = self.nova_order_repo().select_one_by_delivery_id(order.deliveryId)
                status_data = self.track_ttn(delivery_obj.ttn)
                status = status_data["status"]
                if status is None:
                    # print("STATUS-NONE", status)
                    continue
                if status != order.status:
                    # print("SSS", status.value)
                    # print("RRR", order.status)
                    self.order_repo().update_one(id=order.id ,status=status)
                    update_statuses_count += 1
        return update_statuses_count

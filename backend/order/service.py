import uuid
from typing import Optional

from utils.service import Service
from utils.repository import Repository


class OrderService(Service):
    def __init__(
        self,
        order_repo: Repository,
        order_item_repo: Repository,
        delivery_company_repo: Repository
        ):
        self.order_repo = order_repo
        self.order_item_repo = order_item_repo
        self.delivery_company_repo = delivery_company_repo

    def get_orders(self, page: Optional[int] = None):
        self.repo = self.order_repo
        data = self.get(page)
        # d = data.get("data")
        # prefix_data = []
        # for item in d:
        #     delivery_company_data = await self.delivery_company_repo(self.session).select_one_by_id(item.deliveryCompanyId)
        #     prefix_data.append(delivery_company_data.prefix)
        # return data, prefix_data
        return data

    def get_order(self, id: uuid.UUID):
        data = self.order_repo().get_one_by_id(id)
        if not data:
            return None
        delivery_company_data = self.delivery_company_repo().get_one_by_id(data.deliveryCompanyId)
        return data, delivery_company_data.prefix

    def get_order_items(self, orderId: uuid.UUID, page: Optional[int] = None):
        self.repo = self.order_item_repo
        data = self.get(page, orderId=orderId)
        return data

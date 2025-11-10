import uuid
from typing import Optional

from backend.config import settings
from utils.client import JSONClient

from .enums import CargoType, PaymentMethod, PayerType, ServiceType


class NOVAClient(JSONClient):
    def __init__(self):
        super().__init__(
            base_url="https://api.novaposhta.ua/v2.0/json/"
        )

    def fetch_localities(self, page: int) -> Optional[list[dict]]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "AddressGeneral",
            "calledMethod": "getCities",
            "methodProperties": {
                "Page": str(page) # limit 71
            }
        }
        data = self.post()
        return data

    def fetch_points(self, page: int) -> Optional[list[dict]]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "AddressGeneral",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                "Page": str(page) # limit 83
            }
        }
        data = self.post()
        return data
    
    def check_price(
            self,
            city_recipient_ref: uuid.UUID,
            weight: float,
            cost: int,
            seats_amount: int = 1
        ) -> Optional[dict]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "InternetDocument",
            "calledMethod": "getDocumentPrice",
            "methodProperties": {
                "CitySender": settings.NOVA_CITY_SENDER,
                "CityRecipient": str(city_recipient_ref),
                "Weight": str(weight),
                "ServiceType": ServiceType.WAREHOUSE_WAREHOUSE.label,
                "Cost": str(cost),
                "CargoType": CargoType.PARCEL.label,
                "SeatsAmount": seats_amount,
                "RedeliveryCalculate": {
                    "CargoType": "Money",
                    "Amount": str(cost)
                },
                "PayerType": "Recipient"
    }
        }
        data = self.post()
        return data

    def create_counterparty(
        self,
        first_name: str,
        last_name: str,
        phone_number: str,
        city_ref: uuid.UUID
        ) -> Optional[dict]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "Counterparty",
            "calledMethod": "save",
            "methodProperties": {
                "CounterpartyType": "PrivatePerson",
                "CounterpartyProperty": "Recipient",
                "FirstName": first_name,
                "LastName": last_name,
                "Phone": phone_number,
                "CityRef": str(city_ref)
            }
        }
        data = self.post()
        return data

    # async def get_contact(
    #     self,
    #     counterparty_ref: uuid.UUID
    #     ) -> Optional[dict]:
    #     self.payload = {
    #         "apiKey": settings.NOVA_API_KEY,
    #         "modelName": "Counterparty",
    #         "calledMethod": "getCounterpartyContactPersons",
    #         "methodProperties": {
    #             "Ref": counterparty_ref
    #         }
    #     }
    #     data = await self.post()
    #     return data

    def create_order(
        self,
        # payer_type: PayerType,
        weight: float,
        description: str,
        cost: int,
        city_recipient: uuid.UUID,
        recipient: uuid.UUID,
        recipient_address: uuid.UUID,   
        contact_recipient: uuid.UUID,
        recipient_phone: str,
        redelivery_string: int
        ) -> Optional[dict]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "InternetDocument",
            "calledMethod": "save",
            "methodProperties": {
                "NewAddress": "1",
                "PayerType": PayerType.RECIPIENT.label,
                "PaymentMethod": PaymentMethod.CASH.label,
                "CargoType": CargoType.PARCEL.label,
                # "VolumeGeneral": "0.1",
                "Weight": str(weight),
                "ServiceType": ServiceType.WAREHOUSE_WAREHOUSE.label,
                "SeatsAmount": "1",
                "Description": description,
                "Cost": cost,
                "CitySender": settings.NOVA_CITY_SENDER, # CITY_REF_SENDER
                "Sender": settings.NOVA_SENDER_COUNTERPARTY_REF, # COUNTERPARTY_REF_SENDER
                "SenderAddress": settings.NOVA_SENDER_ADDRESS, # WAREHOUSE_REF_SENDER
                "ContactSender": settings.NOVA_SENDER_CONTACT_REF, # CONTACT_PERSON_REF
                "SendersPhone": settings.NOVA_PHONE_NUMBER,
                "CityRecipient": str(city_recipient), # CITY_REF_RECIPIENT
                "Recipient": str(recipient), # COUNTERPARTY_REF_RECIPIENT
                "RecipientAddress": str(recipient_address), # WAREHOUSE_REF_RECIPIENT
                "ContactRecipient": str(contact_recipient), # CONTACT_PERSON_REF
                "RecipientsPhone": recipient_phone,
                "BackwardDeliveryData": [
                        {
                            "PayerType": PayerType.RECIPIENT.label,
                            "CargoType": "Money",
                            "RedeliveryString": str(redelivery_string),
                            "RecipientBankCard": settings.NOVA_BANK_CARD
                        }]
            }
        }
        data = self.post()
        return data

    def track_ttn(
        self,
        ttn: int
    ) -> Optional[dict]:
        self.payload = {
            "apiKey": settings.NOVA_API_KEY,
            "modelName": "TrackingDocument",
            "calledMethod": "getStatusDocuments",
            "methodProperties": {
                "Documents": [
                    {
                        "DocumentNumber": str(ttn),
                        "Phone": settings.NOVA_PHONE_NUMBER
                    }
                ]
            }
        }
        data = self.post()
        return data

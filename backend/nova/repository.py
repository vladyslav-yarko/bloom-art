import uuid

from utils.repository import DjangoORMRepository

from .models import NovaOrder


class NovaOrderRepository(DjangoORMRepository):
    model = NovaOrder

    async def select_one_by_delivery_id(self, delivery_id: uuid.UUID):
        return self.get_one(pk=delivery_id)

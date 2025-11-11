from utils.repository import DjangoORMRepository

from .models import Order, OrderItem, DeliveryCompany
from .enums import CompanyPrefix


class OrderRepository(DjangoORMRepository):
    model = Order


class OrderItemRepository(DjangoORMRepository):
    model = OrderItem


class DeliveryCompanyRepository(DjangoORMRepository):
    model = DeliveryCompany

    def select_one_by_prefix(self, prefix: CompanyPrefix):
        return self.get_one(prefix=prefix)

from typing import Optional

from utils.repository import DjangoORMRepository

from .models import Order, OrderItem


class OrderRepository(DjangoORMRepository):
    model = Order


class OrderItemRepository(DjangoORMRepository):
    model = OrderItem

from typing import Optional

from utils.repository import DjangoORMRepository

from .models import Order


class OrderRepository(DjangoORMRepository):
    model = Order

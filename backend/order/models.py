import uuid

from django.db import models
from django.utils import timezone

from .enums import (
    Company,
    CompanyPrefix,
    Payment,
    Status
)


class DeliveryCompany(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=20, choices=Company.choices)
    prefix = models.CharField(max_length=20, choices=CompanyPrefix.choices)

    class Meta:
        db_table = "delivery_companies"

    def __str__(self):
        return self.title


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    status = models.CharField(
        max_length=50,
        choices=Status.choices,
        default=Status.AWAITING_ACCEPTANCE,
    )
    payment = models.CharField(
        max_length=20,
        choices=Payment.choices,
        default=Payment.COD,
    )
    price = models.IntegerField()

    delivery_company = models.ForeignKey(
        'DeliveryCompany',
        on_delete=models.CASCADE,
        related_name='orders'
    )

    delivery_id = models.UUIDField()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "orders"


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    order = models.ForeignKey(
        'Order',
        on_delete=models.CASCADE,
        related_name='items'
    )

    title = models.CharField(max_length=100)
    item_price = models.FloatField()
    quantity = models.IntegerField()
    total_price = models.FloatField()
    weight = models.FloatField()
    total_weight = models.FloatField()

    class Meta:
        db_table = "order_items"

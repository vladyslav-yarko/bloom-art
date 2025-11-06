import uuid

from django.db import models

from .enums import (
    NewAddress,
    PayerType,
    PaymentMethod,
    CargoType,
    ServiceType
)


class NovaOrder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    order = models.ForeignKey(
        'Order',
        on_delete=models.CASCADE,
        related_name='nova_orders',
        null=True,
        blank=True
    )
    delivery_company = models.ForeignKey(
        'DeliveryCompany',
        on_delete=models.CASCADE,
        related_name='nova_orders'
    )

    shipping_price = models.IntegerField()
    ttn = models.BigIntegerField()

    new_address = models.CharField(
        max_length=5,
        choices=NewAddress.choices,
        default=NewAddress.ONE
    )
    payer_type = models.CharField(
        max_length=20,
        choices=PayerType.choices,
        default=PayerType.RECIPIENT
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )
    cargo_type = models.CharField(
        max_length=20,
        choices=CargoType.choices,
        default=CargoType.PARCEL
    )
    weight = models.FloatField()
    service_type = models.CharField(
        max_length=30,
        choices=ServiceType.choices,
        default=ServiceType.WAREHOUSE_WAREHOUSE
    )
    seats_amount = models.CharField(max_length=20, default="1")
    description = models.CharField(max_length=100)
    cost = models.IntegerField()

    # UUID-based sender/recipient data
    city_sender = models.UUIDField()
    sender = models.UUIDField()
    sender_address = models.UUIDField()
    contact_sender = models.UUIDField()
    sender_phone = models.CharField(max_length=60)

    city_recipient = models.UUIDField()
    recipient = models.UUIDField()
    recipient_address = models.UUIDField()
    contact_recipient = models.UUIDField()
    recipient_phone = models.CharField(max_length=60)

    cargo_type_backward = models.CharField(max_length=100, default="Money")
    redelivery_string = models.IntegerField()
    recipient_bank_card = models.CharField(max_length=100)
    recipient_first_name = models.CharField(max_length=100)
    recipient_last_name = models.CharField(max_length=100)
    cost_redelivery = models.IntegerField()
    profit = models.IntegerField()

    class Meta:
        db_table = "nova_orders"

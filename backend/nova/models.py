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

    orderId = models.ForeignKey(
        'order.Order',
        on_delete=models.CASCADE,
        related_name='nova_orders',
        null=True,
        blank=True
    )
    deliveryCompanyId = models.ForeignKey(
        'order.DeliveryCompany',
        on_delete=models.CASCADE,
        related_name='nova_orders'
    )

    shippingPrice = models.IntegerField()
    ttn = models.BigIntegerField()

    newAddress = models.CharField(
        max_length=5,
        choices=NewAddress.choices,
        default=NewAddress.ONE
    )
    payerType = models.CharField(
        max_length=20,
        choices=PayerType.choices,
        default=PayerType.RECIPIENT
    )
    paymentMethod = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )
    cargoType = models.CharField(
        max_length=20,
        choices=CargoType.choices,
        default=CargoType.PARCEL
    )
    weight = models.FloatField()
    serviceType = models.CharField(
        max_length=30,
        choices=ServiceType.choices,
        default=ServiceType.WAREHOUSE_WAREHOUSE
    )
    seatsAmount = models.CharField(max_length=20, default="1")
    description = models.CharField(max_length=100)
    cost = models.IntegerField()

    # UUID-based sender/recipient data
    citySender = models.UUIDField()
    sender = models.UUIDField()
    senderAddress = models.UUIDField()
    contactSender = models.UUIDField()
    senderPhone = models.CharField(max_length=60)

    cityRecipient = models.UUIDField()
    recipient = models.UUIDField()
    recipientAddress = models.UUIDField()
    contactRecipient = models.UUIDField()
    recipientPhone = models.CharField(max_length=60)

    cargoTypeBackward = models.CharField(max_length=100, default="Money")
    redeliveryString = models.IntegerField()
    recipientBankCard = models.CharField(max_length=100)
    recipientFirstName = models.CharField(max_length=100)
    recipientLastName = models.CharField(max_length=100)
    costRedelivery = models.IntegerField()
    profit = models.IntegerField()

    class Meta:
        db_table = "nova_orders"

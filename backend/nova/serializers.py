from rest_framework import serializers
from order.enums import Source
from order.serializers import OrderItemBodySerializer
from .enums import NewAddress, PaymentMethod, CargoType, ServiceType


class LocalitySerializer(serializers.Serializer):
    fullTitle = serializers.CharField()
    title = serializers.CharField()
    cityRef = serializers.UUIDField()
    localityType = serializers.CharField()
    localityTypeShorthand = serializers.CharField()
    region = serializers.CharField()


class LocalitiesPublicSerializer(serializers.Serializer):
    data = LocalitySerializer(many=True)
    source = serializers.ChoiceField(choices=Source.choices)


class CacheStatusSerializer(serializers.Serializer):
    isCached = serializers.BooleanField()
    timeToExpire = serializers.IntegerField()


class PointSerializer(serializers.Serializer):
    title = serializers.CharField()
    ref = serializers.UUIDField()
    cityRef = serializers.UUIDField()
    warehouseTypeRef = serializers.UUIDField()


class PointsPublicSerializer(serializers.Serializer):
    data = PointSerializer(many=True)
    source = serializers.ChoiceField(choices=Source.choices)


class OrderSerializer(serializers.Serializer):
    # payerType = serializers.ChoiceField(choices=[(e.value, e.name) for e in PayerType])
    weight = serializers.FloatField()
    description = serializers.CharField(max_length=99)
    cost = serializers.IntegerField()
    cityRecipient = serializers.UUIDField()
    recipientAddress = serializers.UUIDField()
    recipientPhone = serializers.CharField()
    recipientFirstName = serializers.CharField()
    recipientLastName = serializers.CharField()
    redeliveryString = serializers.IntegerField()

    def validate_weight(self, value):
        return check_decimal_number(value)

    def validate_recipientPhone(self, value):
        return check_phone_number(value)


class OrderBodySerializer(OrderSerializer):
    # payment = serializers.ChoiceField(choices=[(e.value, e.name) for e in PaymentMethod])
    items = OrderItemBodySerializer(many=True)


class OrderPublicSerializer(OrderSerializer):
    id = serializers.UUIDField()
    ttn = serializers.IntegerField()
    shippingPrice = serializers.IntegerField()
    orderId = serializers.UUIDField()
    newAddress = serializers.ChoiceField(choices=[(e.value, e.name) for e in NewAddress])
    paymentMethod = serializers.ChoiceField(choices=[(e.value, e.name) for e in PaymentMethod])
    cargoType = serializers.ChoiceField(choices=[(e.value, e.name) for e in CargoType])
    serviceType = serializers.ChoiceField(choices=[(e.value, e.name) for e in ServiceType])
    seatsAmount = serializers.CharField()
    cargoTypeBackward = serializers.CharField()
    citySender = serializers.UUIDField()
    sender = serializers.UUIDField()
    senderAddress = serializers.UUIDField()
    contactSender = serializers.UUIDField()
    senderPhone = serializers.CharField()
    recipient = serializers.UUIDField()
    contactRecipient = serializers.UUIDField()
    costRedelivery = serializers.IntegerField()
    profit = serializers.IntegerField()
    recipientBankCard = serializers.CharField()

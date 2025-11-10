from rest_framework import serializers

from utils.validation import check_decimal_number
from base.serializers import PaginationSerializer
from .enums import Status, Payment, CompanyPrefix


class OrderItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=99)
    itemPrice = serializers.IntegerField()
    quantity = serializers.IntegerField()
    weight = serializers.FloatField()

    def validate_weight(self, value):
        return check_decimal_number(value)


class OrderItemBodySerializer(OrderItemSerializer):
    pass


class OrderPublicSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    status = serializers.ChoiceField(choices=[(s.value, s.name) for s in Status])
    payment = serializers.ChoiceField(choices=[(p.value, p.name) for p in Payment])
    price = serializers.IntegerField()
    deliveryCompanyId = serializers.UUIDField()
    deliveryId = serializers.UUIDField()
    # prefix = serializers.ChoiceField(
    #     choices=[(c.value, c.name) for c in CompanyPrefix],
    #     required=False,
    #     allow_null=True
    # )
    createdAt = serializers.DateTimeField()
    updatedAt = serializers.DateTimeField()


class OrdersPublicSerializer(PaginationSerializer):
    data = OrderPublicSerializer(many=True)


class OrderItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=99)
    itemPrice = serializers.IntegerField()
    quantity = serializers.IntegerField()
    weight = serializers.FloatField()

    def validate_weight(self, value):
        return check_decimal_number(value)


class OrderItemPublicSerializer(OrderItemSerializer):
    id = serializers.UUIDField()
    orderId = serializers.UUIDField()
    totalPrice = serializers.IntegerField()
    totalWeight = serializers.FloatField()


class OrderItemsPublicSerializer(PaginationSerializer):
    data = OrderItemPublicSerializer(many=True)


class UpdatedOrdersPublicSerializer(serializers.Serializer):
    novaOrderUpdatesCount = serializers.IntegerField()
    orderUpdatesCount = serializers.IntegerField()

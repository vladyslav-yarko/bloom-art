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
    title = serializers.CharField(max_length=99, example="title")
    itemPrice = serializers.IntegerField(example=140)
    quantity = serializers.IntegerField(example=3)
    weight = serializers.FloatField(example=0.5)

    def validate_weight(self, value):
        return check_decimal_number(value)


class OrderItemPublicSerializer(OrderItemSerializer):
    id = serializers.UUIDField(example="fc5f1e3c-928e-11e9-898c-005056b24375")
    orderId = serializers.UUIDField(example="fc5f1e3c-928e-11e9-898c-005056b24375")
    totalPrice = serializers.IntegerField(example=420)
    totalWeight = serializers.FloatField(example=1.5)


class OrderItemsPublicSerializer(PaginationSerializer):
    data = OrderItemPublicSerializer(many=True)

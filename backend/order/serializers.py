from rest_framework import serializers


class OrderItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=99)
    itemPrice = serializers.IntegerField()
    quantity = serializers.IntegerField()
    weight = serializers.FloatField()

    def validate_weight(self, value):
        return check_decimal_number(value)


class OrderItemBodySerializer(OrderItemSerializer):
    pass

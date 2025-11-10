from rest_framework import serializers
from order.enums import Source


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

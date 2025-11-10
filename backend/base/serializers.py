from rest_framework import serializers


class PaginationSerializer(serializers.Serializer):
    page = serializers.IntegerField(required=False, allow_null=True)
    count = serializers.IntegerField()
    hasNext = serializers.BooleanField()
    total = serializers.IntegerField()

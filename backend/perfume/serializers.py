from rest_framework import serializers

from base.redis_manager import redis_manager
from .models import Perfume


class PerfumesSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = Perfume
        fields = ["id", "title", "price", "currency", "available", "type", "weight", "volume", "description", "first_notes", "perfume_heart", "last_notes", "sex", "picture"]

    def get_picture(self, obj):
        image_hex = redis_manager.get_photo('perfume', str(obj.id))
        return image_hex

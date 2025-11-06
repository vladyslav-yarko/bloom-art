from rest_framework import serializers

from .models import Perfume


class PerfumesSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(required=True)
    
    class Meta:
        model = Perfume
        fields = ["id", "title", "price", "currency", "available", "type", "weight", "volume", "description", "first_notes", "perfume_heart", "last_notes", "sex"]

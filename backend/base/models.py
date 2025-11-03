import uuid

from django.db import models


class PriceCurrencyEnum(models.TextChoices):
    uah = 'uah'
    usd = 'usd'


class Perfume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    currency = models.CharField(
        max_length=10,
        choices=PriceCurrencyEnum.choices
    )
    available = models.IntegerField()
    type = models.CharField(max_length=100)
    weight = models.FloatField()
    volume = models.FloatField()
    description = models.TextField()
    first_notes = models.CharField(max_length=255)
    perfume_heart = models.CharField(max_length=255)
    last_notes = models.CharField(max_length=255)

    class Meta:
        db_table = "perfumes"
        managed = False

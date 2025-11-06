import uuid

from django.db import models

from .enums import (
    PriceCurrencyEnum,
    VolumeMl,
    FirstNote,
    HeartNote,
    LastNote,
    Sex
)


class Perfume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    title = models.CharField(max_length=255, null=False)
    price = models.IntegerField(null=False)
    currency = models.CharField(
        max_length=10,
        choices=PriceCurrencyEnum.choices,
        null=False
    )
    available = models.IntegerField(null=False)
    type = models.CharField(max_length=100, null=False)
    weight = models.FloatField(null=False)
    volume = models.CharField(
        max_length=100,
        choices=VolumeMl.choices,
        null=False
    )
    description = models.TextField(null=False)
    first_notes = models.CharField(
        max_length=100,
        choices=FirstNote.choices,
        null=False
    )
    perfume_heart = models.CharField(
        max_length=100,
        choices=HeartNote.choices,
        null=False
    )
    last_notes = models.CharField(
        max_length=100,
        choices=LastNote.choices,
        null=False
    )
    sex = models.CharField(
        max_length=100,
        choices=Sex.choices,
        default=Sex.UNISEX,
        null=False
    )

    class Meta:
        db_table = "perfumes"
        # managed = False

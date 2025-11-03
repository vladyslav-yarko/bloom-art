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
    
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    currency = models.CharField(
        max_length=10,
        choices=PriceCurrencyEnum.choices
    )
    available = models.IntegerField()
    type = models.CharField(max_length=100)
    weight = models.FloatField()
    volume = models.CharField(
        max_length=100,
        choices=VolumeMl.choices
    )
    description = models.TextField()
    first_notes = models.CharField(
        max_length=100,
        choices=FirstNote.choices
    )
    perfume_heart = models.CharField(
        max_length=100,
        choices=HeartNote.choices
    )
    last_notes = models.CharField(
        max_length=100,
        choices=LastNote.choices
    )
    sex = models.CharField(
        max_length=100,
        choices=Sex.choices
    )

    class Meta:
        db_table = "perfumes"
        # managed = False


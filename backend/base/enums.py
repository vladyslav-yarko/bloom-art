from django.db import models


class PriceCurrencyEnum(models.TextChoices):
    uah = 'uah'
    usd = 'usd'


class VolumeMl(models.TextChoices):
    ML_10  = 10
    ML_20  = 20
    ML_30  = 30
    ML_50  = 50
    ML_75  = 75
    ML_100 = 100

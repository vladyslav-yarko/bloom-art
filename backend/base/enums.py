from django.db import models


class PriceCurrencyEnum(models.TextChoices):
    uah = 'uah'
    usd = 'usd'

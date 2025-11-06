from django.db import models


class Company(models.TextChoices):
    NOVA = 'nova', 'Nova'
    UKR = 'ukr', 'Ukr'
    MEEST = 'meest', 'Meest'


class CompanyPrefix(models.TextChoices):
    NOVA = 'nova', 'Nova'
    UKR = 'ukr', 'Ukr'
    MEEST = 'meest', 'Meest'

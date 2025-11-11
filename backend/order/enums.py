from django.db import models


class Company(models.TextChoices):
    NOVA = 'nova'
    UKR = 'ukr'
    MEEST = 'meest'


class Source(models.TextChoices):
    CACHE = 'cache'
    API = 'api'


class CacheType(models.TextChoices):
    POINTS = 'points'
    LOCALITIES = 'localities'


class CompanyPrefix(models.TextChoices):
    NOVA = 'nova'
    UKR = 'ukr'
    MEEST = 'meest'


class Status(models.TextChoices):
    AWAITING_ACCEPTANCE = "awaiting acceptance"
    AWAITING_SHIPMENT = "awaiting shipment"
    IN_TRANSIT = "in transit"
    ARRIVED = "arrived"
    ACCEPTED = "accepted"
    SUCCESS = "success"
    RETURNED = "returned"
    DELETED = "deleted"


class Payment(models.TextChoices):
    COD = "cod"
    ONLINE = "online"

from django.db import models


class Company(models.TextChoices):
    NOVA = 'nova', 'Nova'
    UKR = 'ukr', 'Ukr'
    MEEST = 'meest', 'Meest'


class CompanyPrefix(models.TextChoices):
    NOVA = 'nova', 'Nova'
    UKR = 'ukr', 'Ukr'
    MEEST = 'meest', 'Meest'


class Status(models.TextChoices):
    AWAITING_ACCEPTANCE = "awaiting acceptance", "Awaiting Acceptance"
    AWAITING_SHIPMENT = "awaiting shipment", "Awaiting Shipment"
    IN_TRANSIT = "in transit", "In Transit"
    ARRIVED = "arrived", "Arrived"
    ACCEPTED = "accepted", "Accepted"
    SUCCESS = "success", "Success"
    RETURNED = "returned", "Returned"
    DELETED = "deleted", "Deleted"

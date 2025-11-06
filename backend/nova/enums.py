from django.db import models


class PayerType(models.TextChoices):
    SENDER = "Sender", "Sender"
    RECIPIENT = "Recipient", "Recipient"


class CargoType(models.TextChoices):
    CARGO = "Cargo", "Cargo"
    PARCEL = "Parcel", "Parcel"
    DOCUMENTS = "Documents", "Documents"

from django.db import models


class PayerType(models.TextChoices):
    SENDER = "Sender", "Sender"
    RECIPIENT = "Recipient", "Recipient"

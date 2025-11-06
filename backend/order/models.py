import uuid

from django.db import models

from .enums import Company, CompanyPrefix


class DeliveryCompany(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=20, choices=Company.choices)
    prefix = models.CharField(max_length=20, choices=CompanyPrefix.choices)

    class Meta:
        db_table = "delivery_companies"

    def __str__(self):
        return self.title

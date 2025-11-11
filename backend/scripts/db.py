import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from order.enums import CompanyPrefix
from order.models import DeliveryCompany


def fill_delivery_company():
    companies = [
        DeliveryCompany(title="nova", prefix=CompanyPrefix.NOVA.value)
    ]
    DeliveryCompany.objects.bulk_create(companies)


if __name__ == "__main__":
    fill_delivery_company()

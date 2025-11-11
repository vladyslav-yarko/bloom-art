from django.db import models


class PayerType(models.TextChoices):
    SENDER = "Sender"
    RECIPIENT = "Recipient"


class CargoType(models.TextChoices):
    CARGO = "Cargo"
    PARCEL = "Parcel"
    DOCUMENTS = "Documents"


class ServiceType(models.TextChoices):
    WAREHOUSE_WAREHOUSE = "WarehouseWarehouse"
    WAREHOUSE_DOORS = "WarehouseDoors"
    DOORS_WAREHOUSE = "DoorsWarehouse"
    DOORS_DOORS = "DoorsDoors"


class NewAddress(models.TextChoices):
    ZERO = "0"
    ONE = "1"


class PaymentMethod(models.TextChoices):
    CASH = "Cash"
    NON_CASH = "NonCash"

from django.db import models


class PayerType(models.TextChoices):
    SENDER = "Sender", "Sender"
    RECIPIENT = "Recipient", "Recipient"


class CargoType(models.TextChoices):
    CARGO = "Cargo", "Cargo"
    PARCEL = "Parcel", "Parcel"
    DOCUMENTS = "Documents", "Documents"


class ServiceType(models.TextChoices):
    WAREHOUSE_WAREHOUSE = "WarehouseWarehouse", "Warehouse → Warehouse"
    WAREHOUSE_DOORS = "WarehouseDoors", "Warehouse → Doors"
    DOORS_WAREHOUSE = "DoorsWarehouse", "Doors → Warehouse"
    DOORS_DOORS = "DoorsDoors", "Doors → Doors"


class NewAddress(models.TextChoices):
    ZERO = "0", "0"
    ONE = "1", "1"

from django.db import models


class PriceCurrencyEnum(models.TextChoices):
    uah = 'uah'
    usd = 'usd'


class VolumeMl(models.TextChoices):
    ML_10  = 10
    ML_20  = 20
    ML_30  = 30
    ML_50  = 50
    ML_75  = 75
    ML_100 = 100


class FirstNote(models.TextChoices):
    BERGAMOT = "bergamot"
    LEMON = "lemon"
    LIME = "lime"
    GRAPEFRUIT = "grapefruit"
    MANDARIN = "mandarin"
    TANGERINE = "tangerine"
    ORANGE_SWEET = "sweet orange"
    ORANGE_BITTER = "bitter orange"
    POMELO = "pomelo"
    YUZU = "yuzu"
    KUMQUAT = "kumquat"
    CITRON = "citron"
    PETITGRAIN = "petitgrain"

    BLACKCURRANT_LEAF = "blackcurrant leaf"
    GREEN_LEAF = "green leaf"
    FRESH_GRASS = "fresh grass"
    CUCUMBER = "cucumber"
    TOMATO_LEAF = "tomato leaf"
    BAMBOO = "bamboo"
    SHISO = "shiso"
    VERBENA = "verbena"
    LEMONGRASS = "lemongrass"

    SEA_SALT = "sea salt"
    MARINE_BREEZE = "marine breeze"
    OZONE = "ozone"
    AQUATIC_NOTES = "aquatic notes"

    PEPPERMINT = "peppermint"
    MINT = "mint"
    BASIL = "basil"
    ROSEMARY = "rosemary"
    THYME = "thyme"
    TARRAGON = "tarragon"
    CLARY_SAGE = "clary sage"
    EUCALYPTUS = "eucalyptus"
    JUNIPER_BERRY = "juniper berry"

    GINGER = "ginger"
    PINK_PEPPER = "pink pepper"
    BLACK_PEPPER = "black pepper"
    CARDAMOM = "cardamom"
    CORIANDER = "coriander"
    ANISE = "anise"
    FENNEL = "fennel"

    GREEN_APPLE = "green apple"
    PEAR = "pear"
    PINEAPPLE = "pineapple"
    MELON = "melon"
    WATERMELON = "watermelon"
    LYCHEE = "lychee"
    WHITE_GRAPE = "white grape"
    KIWI = "kiwi"

    ALDEHYDES = "aldehydes"

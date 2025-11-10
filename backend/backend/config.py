from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())


class Settings(BaseSettings):

    REDIS_URL: str

    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str

    NOVA_API_KEY: str
    NOVA_CITY_SENDER: str
    NOVA_SENDER_ADDRESS: str
    NOVA_PHONE_NUMBER: str
    NOVA_BANK_CARD: str
    # NOVA_FIRST_NAME: str
    # NOVA_LAST_NAME: str
    NOVA_SENDER_COUNTERPARTY_REF: str
    NOVA_SENDER_CONTACT_REF: str

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()

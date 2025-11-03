from dotenv import load_dotenv, find_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


load_dotenv(find_dotenv())


class Settings(BaseSettings):

    REDIS_URL: str

    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()

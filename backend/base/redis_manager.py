import uuid
from typing import Union

import redis

from backend.config import settings


class RedisManager:
    REDIS_URL = settings.REDIS_URL

    def __init__(self):
        self.engine = redis.from_url(self.REDIS_URL)

    def get_string_data(self, key: str) -> Union[None, str, dict, list]:
        data = self.engine.get(key)
        return data.decode() if data else data

    def set_string_data(self, key: str, data: str, expired: int = 60) -> None:
        self.engine.set(key, data)
        self.engine.expire(key, expired)

    def ttl(self, key: str) -> int:
        time = self.engine.ttl(key)
        return time

    def delete(self, key: str) -> None:
        self.engine.expire(key, 0)

    def add_photo(self, type: str, id: uuid.UUID, photo: str) -> None:
        self.engine.set(f'{type}:{id}:image', photo)
        return None

    def get_photo(self, type: str, id: uuid.UUID):
        photo: str = self.engine.get(f'{type}:{id}:image')
        return photo


redis_manager = RedisManager()

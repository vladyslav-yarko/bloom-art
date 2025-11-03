import uuid
from typing import Union

import redis

from backend.config import settings


class RedisManager:
    REDIS_URL = settings.REDIS_URL

    def __init__(self):
        self.engine = redis.from_url(self.REDIS_URL)

    # async def get_string_data(self, key: str) -> Union[None, str, dict, list]:
    #     data = await self.engine.get(key)
    #     return data.decode() if data else data

    # async def set_string_data(self, key: str, data: str, expired: int = 60) -> None:
    #     await self.engine.set(key, data)
    #     await self.engine.expire(key, expired)

    # async def ttl(self, key: str) -> int:
    #     time = await self.engine.ttl(key)
    #     return time

    # async def delete(self, key: str) -> None:
    #     await self.engine.expire(key, 0)

    def add_photo(self, type: str, id: uuid.UUID, photo: str) -> None:
        self.engine.set(f'{type}:{id}:image', photo)
        return None


redis_manager = RedisManager()

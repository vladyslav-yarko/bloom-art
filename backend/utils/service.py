import uuid
from typing import Optional, Union

from base.redis_manager import redis_manager


class Service:
    def __init__(
        self
        ):
        self.repo = None
        self.redis_manager = redis_manager

    def get(self, page: Optional[int] = None, **kwargs) -> dict:
        full_data = self.repo().get(page, **kwargs)
        data, total, offset = full_data

        # import logging

        # logging.basicConfig(
        #     level=logging.DEBUG,
        #     format="[%(asctime)s] %(levelname)s %(name)s: %(message)s",
        # )

        # logger = logging.getLogger(__name__)

        # # use this instead of print()
        # logger.debug("9999999999999999999999999999999999999")
        # logger.debug(type(data))
        # logger.debug(data)
        # logger.debug("9999999999999999999999999999999999999")

        count = len(data)
        has_next = False
        if page is not None:
            has_next = (page * offset) < total
        res = {
            "data": data,
            "page": page,
            "count": count,
            "total": total,
            "hasNext": has_next
        }
        return res

    def get_one(self, id: Union[int, uuid.UUID]) -> Union[dict, tuple[int, str], str]:
        data = self.repo().get_one_by_id(id)
        # if not data:
        #     data = "Object has not found"
        return data

    def create_one(self, data: dict) -> dict:
        obj = self.repo().create_one(**data)
        return obj.to_dict()

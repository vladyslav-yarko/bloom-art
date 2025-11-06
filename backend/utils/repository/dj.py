import uuid
from typing import Optional, Union

from .repository import Repository


class DjangoORMRepository(Repository):
    model = None
    PAGINATION_OFFSET = 15
    PAGINATION_LIMIT = 15
    LATEST_LIMIT = 10

    # def __init__(self, session: AsyncSession):
    #     self.session = session

    # def equal_conditions(self, **kwargs) -> list:
    #     conditions = []
    #     for key, value in kwargs.items():
    #         if value:
    #             condition = getattr(self.model, key) == value
    #             conditions.append(condition)
    #     return conditions

    async def get_count(self, **kwargs) -> Optional[int]:
        count = self.model.objects.count()
        return count

    def get(self, page: Optional[int] = None, **kwargs) -> Optional[tuple[list, int, int]]:
        total = self.get_count(**kwargs)
        if page is None:
            data = self.model.objects.all()
        else:
            offset_page = page - 1
            offset = self.PAGINATION_OFFSET * offset_page
            data = self.model.objects.all()[offset:offset + self.PAGINATION_LIMIT]
        return data, total, self.PAGINATION_OFFSET

    def get_one(self, **kwargs) -> Optional[dict]:
        obj = self.model.objects.filter(**kwargs).first()
        return obj

    def get_one_by_id(self, id: Union[int, uuid.UUID]) -> Optional[dict]:
        return self.get_one(id=id)

    async def create_one(self, **kwargs) -> Optional[dict]:
        obj = self.model.objects.create(**kwargs)
        return obj

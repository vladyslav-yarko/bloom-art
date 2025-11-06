from typing import Optional

from utils.repository import DjangoORMRepository

from .models import Perfume


class PerfumeRepository(DjangoORMRepository):
    model = Perfume

    # def get(self, page: Optional[int] = None, **kwargs) -> dict:
    #     data, _, _ = super().get()
    #     return data

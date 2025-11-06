from utils.repository import DjangoORMRepository

from .models import Perfume


class PerfumeRepository(DjangoORMRepository):
    model = Perfume
    
    def get(self) -> dict:
        data, _, _ = super().get()
        return data

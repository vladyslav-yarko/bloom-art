from utils.service import Service
from utils.repository import Repository


class PerfumeService(Service):
    def __init__(
        self,
        perfume_repo: Repository
    ):

        self.repo = perfume_repo

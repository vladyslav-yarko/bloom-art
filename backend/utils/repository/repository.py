from abc import ABC, abstractmethod


class Repository(ABC):

    @abstractmethod
    async def get():
        raise NotImplementedError

    @abstractmethod
    async def get_one():
        raise NotImplementedError

    @abstractmethod
    async def get_count():
        raise NotImplementedError

    @abstractmethod
    async def create_one():
        raise NotImplementedError

    @abstractmethod
    async def update_one():
        raise NotImplementedError

    # @abstractmethod
    # async def delete_one():
    #     raise NotImplementedError

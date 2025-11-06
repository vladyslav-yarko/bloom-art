from abc import ABC, abstractmethod
from functools import wraps


class Client(ABC):
    @abstractmethod
    def __init__(self):
        raise NotImplementedError()

    @abstractmethod
    async def open_session(*args, **kwargs) -> None:
        raise NotImplementedError()

    @abstractmethod
    async def close_session(*args, **kwargs) -> None:
        raise NotImplementedError()


def client_session(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        session_was_already_open = self.client.session is not None
        if not session_was_already_open:
            self.client.open_session()
        try:
            return func(self, *args, **kwargs)
        finally:
            if not session_was_already_open:
                self.client.close_session()
    return wrapper

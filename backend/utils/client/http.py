from typing import Optional
import requests

from .client import Client


class HTTPClient(Client):
    def __init__(
        self,
        base_url: str,
        endpoint: str = '',
        params: Optional[dict] = None,
        payload: Optional[dict] = None
    ):
        self.session: Optional[requests.Session] = None
        self.base_url = base_url
        self.endpoint = endpoint
        self.params = params
        self.payload = payload

    def open_session(self) -> None:
        self.session = requests.Session()
        self.session.headers.update({"Accept": "application/json"})
        self.session.base_url = self.base_url

    def close_session(self) -> None:
        if self.session:
            self.session.close()

    def get(self) -> requests.Response:
        url = f"{self.base_url}{self.endpoint}"
        response = self.session.get(
            url=url,
            params=self.params
        )
        return response

    def post(self) -> requests.Response:
        url = f"{self.base_url}{self.endpoint}"
        response = self.session.post(
            url=url,
            json=self.payload,
            params=self.params
        )
        return response

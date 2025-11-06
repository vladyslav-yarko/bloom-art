from typing import Optional, Union

from .http import HTTPClient


class JSONClient(HTTPClient):
    def __init__(
        self,
        base_url: str,
        endpoint: str ='',
        params: Optional[dict] = None,
        payload: Optional[dict] = None
        ):
        super().__init__(
            base_url=base_url,
            endpoint=endpoint,
            params=params,
            payload=payload,
        )

    def get(self) -> Union[list, dict, None]:
        response = super().get()
        if response.status_code == 200:
            return response.json()
        return None

    def post(self) -> Union[list, dict, None]:
        response = super().post()
        if response.status_code == 200:
            return response.json()
        return None

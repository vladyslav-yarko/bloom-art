import time

from metrics import (
    REQUESTS,
    RESPONSES,
    EXCEPTIONS,
    REQUEST_LATENCY,
    IN_PROGRESS
)


APP_NAME = "django-backend"


class PrometheusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        method = request.method
        REQUESTS.labels(path=path, app_name=APP_NAME).inc()
        IN_PROGRESS.labels(path=path, app_name=APP_NAME).inc()
        start_time = time.time()
        try:
            response = self.get_response(request)
            status_code = str(response.status_code)
            RESPONSES.labels(path=path, status_code=status_code, app_name=APP_NAME).inc()
            return response
        except Exception as e:
            EXCEPTIONS.labels(path=path, app_name=APP_NAME).inc()
            raise e
        finally:
            elapsed = time.time() - start_time
            REQUEST_LATENCY.labels(path=path, app_name=APP_NAME).observe(elapsed)
            IN_PROGRESS.labels(path=path, app_name=APP_NAME).dec()

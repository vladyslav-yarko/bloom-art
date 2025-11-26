from prometheus_client import (
    Counter,
    Gauge,
    Histogram
)


REQUESTS = Counter(
    "django_requests_total",
    "Total number of HTTP requests",
    ["path", "app_name"]
)

RESPONSES = Counter(
    "django_responses_total",
    "Total number of HTTP responses",
    ["path", "status_code", "app_name"]
)

EXCEPTIONS = Counter(
    "django_exceptions_total",
    "Total number of HTTP exceptions",
    ["app_name"]
)

REQUEST_LATENCY = Histogram(
    "django_requests_duration_seconds",
    "Request duration in seconds",
    ["path", "app_name"]
)

IN_PROGRESS = Gauge(
    "django_requests_in_progress",
    "Requests currently in progress",
    ["path", "app_name"]
)

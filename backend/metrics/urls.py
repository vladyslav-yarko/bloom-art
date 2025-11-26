from django.urls import path
from .views import metrics

urlpatterns = [
    # ... other urls
    path("metrics/", metrics),
]

from django.urls import path

from .views import PerfumeAllView, PerfumeOneView


urlpatterns = [
    path('', PerfumeAllView.as_view(), name='perfume-all'),
    path('<uuid:pk>/', PerfumeOneView.as_view(), name='perfume-one'),
]

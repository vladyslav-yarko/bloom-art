from django.urls import path

from . import views


urlpatterns = [
    path('localities/', views.LocalitiesPublicView.as_view(), name='localities-public'),
    path('localities/cache-status', views.LocalitiesCacheStatusView.as_view(), name='localities-cache-status'),
    path('localities/cache', views.LocalitiesCacheStatusView.as_view(), name='cache-localities')
]

from django.urls import path

from . import views


urlpatterns = [
    path('localities/', views.LocalitiesPublicView.as_view(), name='localities-public'),
    path('localities/cache-status', views.LocalitiesCacheStatusView.as_view(), name='localities-cache-status'),
    path('localities/cache', views.CacheLocalitiesView.as_view(), name='cache-localities'),

    path('points/', views.PointsPublicView.as_view(), name='points-public'),
    path('points/cache-status', views.PointsCacheStatusView.as_view(), name='points-cache-status'),
    path('points/cache', views.CachePointsView.as_view(), name='cache-points')
]

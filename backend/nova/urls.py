from django.urls import path

from . import views


urlpatterns = [
    path('localities/', views.LocalitiesPublicView.as_view(), name='nova-localities-public'),
    path('localities/cache-status', views.LocalitiesCacheStatusView.as_view(), name='nova-localities-cache-status'),
    path('localities/cache', views.CacheLocalitiesView.as_view(), name='nova-cache-localities'),

    path('points/', views.PointsPublicView.as_view(), name='nova-points-public'),
    path('points/cache-status', views.PointsCacheStatusView.as_view(), name='nova-points-cache-status'),
    path('points/cache', views.CachePointsView.as_view(), name='nova-cache-points'),

    path('orders/', views.CreateOrderView.as_view(), name='nova-create-order'),
    path('orders/price/', views.OrderPriceView.as_view(), name='nova-order-price'),
    path('orders/track/', views.OrderTrackView.as_view(), name='nova-order-track'),
    path('orders/<uuid:id>/', views.GetOrderView.as_view(), name='nova-order-get')
]

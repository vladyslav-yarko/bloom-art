from django.urls import path

from . import views


urlpatterns = [
    path('', views.GetOrdersView.as_view(), name='orders-get-all'),
    path('<uuid:id>/', views.GetOrderView.as_view(), name='orders-get-one'),
    path('item/<uuid:orderId>/', views.GetOrderItemsView.as_view(), name='order-items-get'),
    path('status/', views.UpdateOrderStatuses.as_view(), name='order-update-all')
]

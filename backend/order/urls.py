from django.urls import path

from . import views


urlpatterns = [
    path('', views.GetOrdersView.as_view(), name='orders-get-all'),
    path('<uuid:id>/', views.GetOrderView.as_view(), name='orders-get-one')
]

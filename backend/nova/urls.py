from django import path

from . import views


urlpatterns = [
    path('localities/', views.LocalitiesPublicView.as_view(), name='localities-public')
]

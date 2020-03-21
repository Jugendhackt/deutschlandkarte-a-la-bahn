from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'netzkarte'
urlpatterns = [
    path(
        '',
        TemplateView.as_view(
            template_name="netzkarte/index.html"),
        name='index'),
    path('api', views.testjson, name='api'),
]

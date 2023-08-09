from django.urls import path
from common.views import test

app_name = 'common'

urlpatterns = [
    path('test/', test),
]
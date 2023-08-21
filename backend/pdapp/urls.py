from django.urls import path
from pdapp.views import test


app_name = 'pdapp'

urlpatterns = [
    path('test/', test),

]
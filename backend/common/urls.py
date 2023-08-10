from django.urls import path
from common.views import user_join, user_login

app_name = 'common'

urlpatterns = [
    path('user_join/', user_join),
    path('user_login/', user_login),
]
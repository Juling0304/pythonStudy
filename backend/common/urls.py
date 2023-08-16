from django.urls import path
from common.views import user_join, user_login, jwt_test, get_menu
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

app_name = 'common'

urlpatterns = [
    path('user_join/', user_join),
    path('user_login/', user_login),
    path('menu/', get_menu),
    path('jwt-test/', jwt_test),
    path('jwt-token-auth/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('jwt-token-auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt-token-auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
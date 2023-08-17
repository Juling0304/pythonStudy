from django.urls import path
from boards.views import hello_rest_api, write_post, list_post


app_name = 'boards'

urlpatterns = [
    path('test/', hello_rest_api),
    path('write_post/', write_post),
    path('list_post/', list_post),

]
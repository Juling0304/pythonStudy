from django.urls import path
from boards.views import hello_rest_api, post, list_post, vote, reply


app_name = 'boards'

urlpatterns = [
    path('test/', hello_rest_api),
    path('post/', post),
    path('list_post/', list_post),
    path('post/vote/', vote),
    path('reply/', reply)
]
"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

django_asgi_app  = get_asgi_application()

# import config.routing
# import가 안되나?
from django.urls import re_path

from chat.consumers import TextRoomConsumer

websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', TextRoomConsumer.as_asgi()),
]
################################


application = ProtocolTypeRouter({
    "http": django_asgi_app,
    'websocket':
        URLRouter(
            websocket_urlpatterns
        )
    ,
})
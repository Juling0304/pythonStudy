from django.urls import path
from pdapp.views_first import basic, rank, expending, rolling, ewm
from pdapp.views_second import applymap, pipe, agg, transform, loc, head

app_name = 'pdapp'

urlpatterns = [
    path('basic/', basic),
    path('rank/', rank),
    path('expending/', expending),
    path('rolling/', rolling),
    path('ewm/', ewm),
    path('applymap/', applymap),
    path('pipe/', pipe),
    path('agg/', agg),
    path('transform/', transform),
    path('loc/', loc),
    path('head/', head),
]
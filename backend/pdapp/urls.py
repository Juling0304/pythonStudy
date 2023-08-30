from django.urls import path
from pdapp.views_first import basic, rank, expending, rolling, ewm
from pdapp.views_second import applymap, pipe, agg, transform, loc, head, mortgage, diff, dtyps, pdfilter, sample
from pdapp.views_third import pdnull, pdnullfill

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
    path('mortgage/', mortgage),
    path('diff/', diff),
    path('dtyps/', dtyps),
    path('pdfilter/', pdfilter),
    path('sample/', sample),
    path('pdnull/', pdnull),
    path('pdnullfill/', pdnullfill),
]
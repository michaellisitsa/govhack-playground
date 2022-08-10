from django.urls import path
from . import views
# from .views import TimeSeriesVew

urlpatterns = [
    path('', views.index,
    name='index'),
]

# urlpatterns = patterns('',
#     url(r'^data', TimeSeriesView.as_view()),
# )

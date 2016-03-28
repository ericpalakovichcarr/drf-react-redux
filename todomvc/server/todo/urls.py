from django.conf.urls import url
from todomvc import routers

from . import views
from . import api


router = routers.SharedAPIRootRouter()
router.register(r'todos', api.TodoViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
]

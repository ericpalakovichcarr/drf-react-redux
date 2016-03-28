from rest_framework import routers


class SharedAPIRootRouter():
    router = routers.DefaultRouter()

    def register(self, *args, **kwargs):
        self.router.register(*args, **kwargs)

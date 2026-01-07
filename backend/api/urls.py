from django.urls import path
from .views import HelloWorld

urlpatterns = [
    # Class-based view (use .as_view())
    path('hello/', HelloWorld.as_view(), name='hello_world_class'),
]

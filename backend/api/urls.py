from django.urls import include
from django.urls import path

urlpatterns = [
    path(r"v1/", include("photos.urls")),
]

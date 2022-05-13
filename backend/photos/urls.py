from rest_framework import routers

from .views import OwnPhotoViewSet
from .views import PhotoViewSet

router = routers.DefaultRouter()
router.register(r"photos/own", OwnPhotoViewSet, basename="photos-own")
router.register(r"photos", PhotoViewSet)

urlpatterns = router.urls

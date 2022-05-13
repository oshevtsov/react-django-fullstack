from rest_framework import decorators
from rest_framework import mixins
from rest_framework import parsers
from rest_framework import permissions
from rest_framework import response
from rest_framework import status
from rest_framework import viewsets

from .mixins import PerActionSerializerMixin
from .models import Photo
from .permissions import PhotoPermission
from .serializers import OwnPhotoDetailSerializer
from .serializers import PhotoDetailSerializer
from .serializers import PhotoSerializer
from .serializers import PhotoSourceSerializer


class PhotoViewSet(PerActionSerializerMixin, viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    action_serializers = {"retrieve": PhotoDetailSerializer}
    permission_classes = [PhotoPermission]

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    @decorators.action(detail=True,
                       methods=["PUT"],
                       serializer_class=PhotoSourceSerializer,
                       parser_classes=[parsers.MultiPartParser])
    def source(self, request, pk):
        obj = self.get_object()
        serializer = self.serializer_class(obj,
                                           data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)


class OwnPhotoViewSet(PerActionSerializerMixin, mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin, mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    serializer_class = PhotoSerializer
    action_serializers = {"retrieve": OwnPhotoDetailSerializer}
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.photo_set.all()

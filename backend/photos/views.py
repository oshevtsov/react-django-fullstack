from rest_framework import decorators
from rest_framework import parsers
from rest_framework import response
from rest_framework import status
from rest_framework import viewsets

from .models import Photo
from .serializers import PhotoSerializer
from .serializers import PhotoSourceSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    queryset = Photo.objects.all()

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
            # TODO: Should it be validated_data or data?
            return response.Response(serializer.data)
        return response.Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)

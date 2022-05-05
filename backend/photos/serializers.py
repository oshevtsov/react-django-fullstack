from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Photo
        fields = ["id", "owner", "title", "description", "source"]
        read_only_fields = ["source"]


class PhotoSourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ["source"]

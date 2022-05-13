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


class PhotoDetailSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    prev_id = serializers.SerializerMethodField()
    next_id = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = [
            "id", "prev_id", "next_id", "owner", "title", "description",
            "source"
        ]
        read_only_fields = ["source"]

    def get_prev_id(self, current):
        prev = Photo.objects.filter(id__lt=current.id).last()
        if prev:
            return prev.id
        return None

    def get_next_id(self, current):
        next = Photo.objects.filter(id__gt=current.id).first()
        if next:
            return next.id
        return None


class OwnPhotoDetailSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    prev_id = serializers.SerializerMethodField()
    next_id = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = [
            "id", "prev_id", "next_id", "owner", "title", "description",
            "source"
        ]
        read_only_fields = ["source"]

    def get_prev_id(self, current):
        prev = current.owner.photo_set.filter(id__lt=current.id).last()
        if prev:
            return prev.id
        return None

    def get_next_id(self, current):
        next = current.owner.photo_set.filter(id__gt=current.id).first()
        if next:
            return next.id
        return None

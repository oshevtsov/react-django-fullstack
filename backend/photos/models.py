from django.conf import settings
from django.core.files.storage import default_storage
from django.db import models


def get_unique_filename(filename: str):
    name, dot, ext = filename.rpartition(".")
    return default_storage.get_alternative_name(name, f"{dot}{ext}")


def get_owner_upload_path(photo, filename):
    upload_name = get_unique_filename(filename)
    return f"{photo.owner.username}/{upload_name}"


class Photo(models.Model):
    """Photo loaded by a user"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=160, blank=True)
    source = models.ImageField(upload_to=get_owner_upload_path, blank=True)

    class Meta:
        ordering = ["id"]

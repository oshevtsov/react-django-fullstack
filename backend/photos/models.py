from django.conf import settings
from django.db import models


def get_owner_upload_path(photo, filename):
    return f"uploads/{photo.owner.username}/{filename}"


class Photo(models.Model):
    """Photo loaded by a user"""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=160, blank=True, null=True)
    source = models.ImageField(upload_to=get_owner_upload_path)

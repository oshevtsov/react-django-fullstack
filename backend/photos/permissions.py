from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS


class PhotoPermission(BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if request.method in SAFE_METHODS:
            return True

        return bool(user and user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if request.method in SAFE_METHODS:
            return True

        if request.method == "DELETE" and user and user.is_staff:
            return True

        if request.method == "PUT" or request.method == "PATCH":
            return bool(user and (user.is_staff or obj.owner == user))

        return bool(user and user.is_authenticated)

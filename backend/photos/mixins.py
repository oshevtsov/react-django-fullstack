from rest_framework.serializers import BaseSerializer


class PerActionSerializerMixin:
    action_serializers = {}

    def get_serializer_class(self):
        serializer = self.action_serializers.get(self.action)
        if serializer and issubclass(serializer, BaseSerializer):
            return serializer

        return super().get_serializer_class()

from django.contrib.auth.models import User, Group
from rest_framework import serializers, status
from rest_framework.response import Response
from datetime import datetime
from rest_framework.renderers import JSONRenderer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()


class CommentSerializer(serializers.Serializer):
    """https://www.django-rest-framework.org/api-guide/serializers/#serializing-objects"""
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

    def create(self, validated_data):
        return Comment(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.content = validated_data.get('content', instance.content)
        instance.created = validated_data.get('created', instance.created)
        return instance

# class UserCountSerializer(serializers.ModelSerializer):
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if not serializer.is_valid(raise_exception=False):
#             return Response({"Fail": "blabla", status: status.HTTP_404_NOT_FOUND})
#         self.perform_create(serializer)
#          headers = self.get_success_headers(serializer.data)
#         return Response({"Success": "msb blablabla"}, status=status.HTTP_201_CREATED, headers=headers)

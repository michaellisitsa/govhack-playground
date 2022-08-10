from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, mixins, viewsets
from djangoapp.serializers import UserSerializer, GroupSerializer, CommentSerializer
from pandasdmx import Request

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from datetime import datetime
from rest_framework.renderers import JSONRenderer
import logging
from datetime import datetime
# class Comment:
#     def __init__(self, email, content, created=None):
#         self.email = email
#         self.content = content
#         self.created = created or datetime.now()


def index(request):
    # comment = Comment(email="michael@example.com", content='foo bar')
    serializer = CommentSerializer({"email": "a@b.com", "content": "test", "created": datetime.now()})
    logging.warn(serializer)
    json = JSONRenderer().render(serializer.data)
    logging.warn(json)
    return HttpResponse(json)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# class UserCountView(mixins.ListModelMixin,
#                      viewsets.GenericViewSet):
#     """
#     A view that returns the count of active users in JSON.
#     """
#     queryset = User.objects.all()
#     renderer_classes = [JSONRenderer]
#     serializer_class = UserCountSerializer

    # def get_queryset(self):
    #     queryset = User.objects.all().count()
    #     content = {'user_count': queryset}
    #     return Response(content)

# Agency_Code = 'ABS_XML'
# # Dataset_Id = 'ATSI_BIRTHS_SUMM'
# Dataset_Id = 'RES_DWELL'
# ABS = Request(Agency_Code)
# data_response = ABS.data(resource_id='RES_DWELL/3.2GMEL.Q',
#                          params={'startPeriod': '2016'})

# # This will result in a pandas Series with multiIndex
# df = data_response.to_pandas()
# # This will convert it to a conventional dataframe
# df_new = df.reset_index()

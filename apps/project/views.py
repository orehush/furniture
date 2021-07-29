from rest_framework import permissions
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.pagination import PageNumberPagination

from apps.project.models import Project
from apps.project.serializers import ProjectSerializer


class ProjectViewSet(ReadOnlyModelViewSet, CreateModelMixin):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = PageNumberPagination

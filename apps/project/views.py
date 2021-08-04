from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

from apps.constructor.serializers import NightstandSerializer
from apps.project.models import Project
from apps.project.serializers import ProjectSerializer


class ProjectViewSet(ReadOnlyModelViewSet, CreateModelMixin):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = PageNumberPagination

    @action(detail=True, methods=['get'], serializer_class=NightstandSerializer)
    def nightstands(self, request, pk):
        project = self.get_object()
        sz = self.get_serializer(project.nightstands.all(), many=True)
        return Response(sz.data)

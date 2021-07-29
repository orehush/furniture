from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action

from apps.constructor.models import NightstandTemplate
from apps.constructor.serializers import NightstandTemplateSerializer, NightstandInputItemTemplateSerializer


class NightstandTemplateViewSet(ReadOnlyModelViewSet):
    queryset = NightstandTemplate.objects.all()
    serializer_class = NightstandTemplateSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = None

    @action(methods=['get'], detail=True, serializer_class=NightstandInputItemTemplateSerializer)
    def input_templates(self, request, pk):
        nightstand_template = self.get_object()
        sz = self.get_serializer(nightstand_template.inputs.all(), many=True)
        return Response(sz.data)

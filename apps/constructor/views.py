from rest_framework import permissions
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin

from apps.constructor.models import NightstandTemplate, Nightstand
from apps.constructor.serializers import NightstandTemplateSerializer, NightstandSerializer


class NightstandTemplateViewSet(ReadOnlyModelViewSet):
    queryset = NightstandTemplate.objects.all()
    serializer_class = NightstandTemplateSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = None


class NightstandViewSet(GenericViewSet, CreateModelMixin, DestroyModelMixin):
    queryset = Nightstand.objects.all()
    serializer_class = NightstandSerializer
    permission_classes = (permissions.IsAuthenticated, )

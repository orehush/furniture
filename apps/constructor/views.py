from rest_framework import permissions
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, UpdateModelMixin

from apps.constructor.models import NightstandTemplate, Nightstand, NightstandInputItem
from apps.constructor.serializers import NightstandTemplateSerializer, NightstandCreateSerializer, NightstandInputItemReadUpdateSerializer
from apps.project.mixins import AuthClassesMixin


class NightstandTemplateViewSet(AuthClassesMixin, ReadOnlyModelViewSet):
    queryset = NightstandTemplate.objects.all()
    serializer_class = NightstandTemplateSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = None


class NightstandViewSet(AuthClassesMixin, GenericViewSet, CreateModelMixin, DestroyModelMixin):
    queryset = Nightstand.objects.all()
    serializer_class = NightstandCreateSerializer
    permission_classes = (permissions.IsAuthenticated, )


class NightstandInputItemViewSet(AuthClassesMixin, GenericViewSet, UpdateModelMixin):
    queryset = NightstandInputItem.objects.all()
    serializer_class = NightstandInputItemReadUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, )

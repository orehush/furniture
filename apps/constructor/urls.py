from rest_framework import routers

from apps.constructor.views import NightstandTemplateViewSet, NightstandViewSet, NightstandInputItemViewSet

router = routers.SimpleRouter(trailing_slash='')
router.register(r'nightstand_templates', NightstandTemplateViewSet)
router.register(r'nightstands', NightstandViewSet)
router.register(r'inputs', NightstandInputItemViewSet)

urlpatterns = router.urls

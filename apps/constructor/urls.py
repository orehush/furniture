from rest_framework import routers

from apps.constructor.views import NightstandTemplateViewSet, NightstandViewSet

router = routers.SimpleRouter()
router.register(r'nightstand_templates', NightstandTemplateViewSet)
router.register(r'nightstands', NightstandViewSet)

urlpatterns = router.urls

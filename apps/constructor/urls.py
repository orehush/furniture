from rest_framework import routers

from apps.constructor.views import NightstandTemplateViewSet

router = routers.SimpleRouter()
router.register(r'nightstand_templates', NightstandTemplateViewSet)

urlpatterns = router.urls

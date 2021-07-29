from rest_framework import routers

from apps.project.views import ProjectViewSet

router = routers.SimpleRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = router.urls

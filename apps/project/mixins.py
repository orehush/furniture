from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class AuthClassesMixin:
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

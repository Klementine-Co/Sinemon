from django.utils.deprecation import MiddlewareMixin
from django.utils.functional import SimpleLazyObject
from django.utils import timezone

from base.models.baseuser import BaseUserModel


def get_baseuser(request, force=False):
    if force or not hasattr(request, "_cached_baseuser"):
        request._cached_baseuser = BaseUserModel.objects.get_from_request(request)
    return request._cached_baseuser


# https://github.com/awesto/django-shop
class BaseUserMiddleware(MiddlewareMixin):
    """
    Similar to Django's AuthenticationMiddleware, which adds the user object to the request,
    this middleware adds the baseuser object to the request.
    """

    def process_request(self, request):
        assert hasattr(request, "session"), (
            "The Base middleware requires session middleware to be installed. "
            "Edit your MIDDLEWARE_CLASSES setting to insert 'django.contrib.sessions.middleware.SessionMiddleware'."
        )
        assert hasattr(request, "user"), (
            "The Base middleware requires an authentication middleware to be installed. "
            "Edit your MIDDLEWARE_CLASSES setting to insert 'django.contrib.auth.middleware.AuthenticationMiddleware'."
        )
        request.baseuser = SimpleLazyObject(lambda: get_baseuser(request))

    def process_response(self, request, response):
        content_type = response.get("content-type")
        try:
            if content_type.startswith("text/html"):
                # only update last_access when rendering the main page
                request.baseuser.last_access = timezone.now()
                request.baseuser.save(update_fields=["last_access"])
        except (AttributeError, ValueError):
            pass
        return response

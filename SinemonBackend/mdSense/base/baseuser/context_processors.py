# https://github.com/awesto/django-shop
from base.models.baseuser import BaseUserModel, VisitingBaseUser


def baseuser(request):
    """
    Add the baseuser to the RequestContext
    """
    import sys

    # print (repr(sys.path))
    # print('RequestContext user', request.user)
    # print('RequestContext auth', request.auth)
    msg = "The request object does not contain a baseuser. Edit your MIDDLEWARE_CLASSES setting to insert 'base.middlerware.BaseUserMiddleware'."
    assert hasattr(request, "baseuser"), msg
    # print('in context processor',request.baseuser.is_authenticated)
    baseuser = request.baseuser
    if request.user.is_staff:
        try:
            baseuser = BaseUserModel.objects.get(pk=request.session["emulate_user_id"])

        except BaseUserModel.DoesNotExist:
            baseuser = VisitingBaseUser()

        except (AttributeError, KeyError):
            pass

    return {"baseuser": baseuser}

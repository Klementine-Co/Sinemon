from rest_framework.permissions import BasePermission
from base.models.medinfo_release import *

# class IsAdmin(BasePermission):
#    def has_permission(self, request, view):
#       return request.user.is_admin

# class IsEditor(BasePermission):
#    def has_permission(self, request, view):
#       return request.user.is_editor

# class IsUser(BasePermission):
#    def has_permission(self, request, view):
#       return request.user.is_user


class MedinfoPermission(BasePermission):
    """
    Global permission check for providers access to member medinfo.
    """

    def has_permission(self, request, view):
        mbr_id = request.GET["mid"]
        myuser = request.baseuser

        # print(request.baseuser.is_authenticated)
        # print('myuser', myuser.user_id)
        # print('mbr_id', mbr_id)
        # print('same', int(mbr_id) == int(myuser.user_id))
        if request.baseuser.is_authenticated:
            if (
                int(myuser.user_id) == int(mbr_id)
                or myuser.user.is_admin
                or myuser.user.is_staff
            ):
                return True
            # print(myuser.user.is_provider)
            # if myuser.user.is_provider:
            # print('checking release')
            # print(Medinfo_release.objects.filter(prov__provider_id=myuser.user_id, member__member_id=mbr_id))
            release = Medinfo_release.objects.filter(
                assigned_id=myuser.user_id, member__member_id=mbr_id
            )
            # print('release 1', release)
            release = release[0] if release.exists() else None

            if release:
                # print('release 2', release.exp_time, release.released)
                if release.released and not release.expired:
                    return True
                else:
                    print("Not released to me")
                    return False

            else:
                print("Not released to me")
                return False

        return False

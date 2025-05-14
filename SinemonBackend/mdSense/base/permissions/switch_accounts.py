from rest_framework.permissions import BasePermission
from base.models.medinfo_release import *


# PRIVILEGES = (
#     ('A', 'Admin'),
#     ('P', 'Provider'),
#     ('1', 'Scheduling Staff'),
#     ('2', 'Record Notes Staff'),
#     ('3', 'Assistant Staff'),
#     ('C', 'Caretaker'),
#     ('R', 'Case Manager'),
#     ('T', 'Authority'),
#     ('G', 'Gaurdian'),
#     ('N', 'None'),
# )
class SwitchMemberAccounts(BasePermission):
    """
    Global permission check for providers access to member medinfo.
    """

    def has_permission(self, request, view):
        mbr_id = request.GET["mid"]
        account_number = request.GET["account_number"]
        myuser = request.baseuser

        if request.baseuser.is_authenticated:
            if (
                int(myuser.user_id) == int(mbr_id)
                or myuser.user.is_admin
                or myuser.user.is_staff
            ):
                return True
            if account_number and mbr_id:
                accounts = Accounts.objects.filter(
                    assigned_id=myuser.user_id,
                    privilege__in="GTCA",
                    account_number=account_number,
                )
                accounts = accounts[0] if accounts.exists() else None
            else:
                return False

            if accounts:
                return True
            else:
                print("Not released to me")
                return False

        return False

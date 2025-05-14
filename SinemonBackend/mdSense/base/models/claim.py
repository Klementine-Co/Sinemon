from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.models.provider import Provider
from base.models.member import Member
from base.baseuser import deferred
from base.models.MEDCODES import Dcodes, Pcodes, Mcodes, POScodes
from datetime import date, datetime
import random

states = {
    "AK": 1,
    "AL": 2,
    "AR": 3,
    "AZ": 4,
    "CA": 5,
    "CO": 6,
    "CT": 7,
    "DE": 8,
    "FL": 9,
    "GA": 10,
    "HI": 11,
    "IA": 12,
    "ID": 13,
    "IL": 14,
    "IN": 15,
    "KS": 16,
    "KY": 17,
    "LA": 18,
    "MA": 19,
    "MD": 20,
    "ME": 21,
    "MI": 22,
    "MN": 23,
    "MO": 24,
    "MS": 25,
    "MT": 26,
    "NC": 27,
    "ND": 28,
    "NE": 29,
    "NH": 30,
    "NJ": 31,
    "NM": 32,
    "NV": 33,
    "NY": 34,
    "OH": 35,
    "OK": 36,
    "OR": 37,
    "PA": 38,
    "RI": 39,
    "SC": 40,
    "SD": 41,
    "TN": 42,
    "TX": 43,
    "UT": 44,
    "VA": 45,
    "VT": 46,
    "WA": 47,
    "WI": 48,
    "WV": 49,
    "WY": 50,
}

# index_dict = {
#     1:''.rjust(1, '9'),
#     2:''.rjust(2, '9'),
#     3:''.rjust(3, '9'),
#     4:''.rjust(4, '9'),
#     5:''.rjust(5, '9'),
#     6:''.rjust(6, '9'),
#     7:''.rjust(7, '9'),
#     8:''.rjust(8, '9'),
#     9:''.rjust(9, '9'),
#     10:''.rjust(10, '9'),
#     11:''.rjust(11, '9'),
#     12:''.rjust(12, '9'),
#     13:''.rjust(13, '9'),
#     14:''.rjust(14, '9'),
#     15:''.rjust(15, '9'),
#     16:''.rjust(16, '9'),
#     17:''.rjust(17, '9'),
#     18:''.rjust(18, '9'),
#     19:''.rjust(19, '9'),
#     20:''.rjust(20, '9'),
#     21:''.rjust(21, '9'),
#     22:''.rjust(22, '9'),
# }


def getClaimPosition(date, state):

    claims = Claim_Info.objects.filter(
        loaded__date=date, billing__provider__user__state=state
    )

    # return str(min([ x for x in index_dict.keys() if int(index_dict.get(x)) >= len(claims)])).zfill(2)
    return str(len(claims)).zfill(7)


def getClaimState(state):
    # return str(sum([ord(x) for x in state]))
    return str(states.get(state))

    # return str(len(claims)),


class ClaimManager(models.Manager):

    def create_claim(self, member, billing, primary_diagnosis, total_amt=0, dxs=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not member:
            raise ValueError("Claim must have a member")
        if not billing:
            raise ValueError("Claim must have a billing provider")

        # two_char_pad = '00' # 2 chars
        date_ = date.today().strftime("%y") + date.today().strftime(
            "%j"
        )  # 5 chars, julian day and 2 digit year
        state = getClaimState(billing.provider.user.state.upper())  # 2 chars
        position = getClaimPosition(
            date.today(), billing.provider.user.state
        )  # 7 chars
        salt = str(round(random.uniform(10, 99)))  # 2 chars

        # print(date_, state, position, salt)
        claimid = date_ + state + position + salt
        # print(claimid)

        claim = self.model(
            claimid=claimid,
            member=member,
            billing=billing,
            primary_diagnosis=primary_diagnosis,
            total_amt=total_amt,
        )

        claim.save(using=self._db)

        if dxs is not None:
            for dx in dxs:
                Claim_Dx.objects.get_or_create(
                    claim=claim,
                    ref=dx.ref,
                    diagnosis=Dcodes.objects.filter(code=dx.code)[0],
                )

        return claim


class Claim_Info(models.Model):

    claimid = models.CharField(primary_key=True, max_length=24)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    billing = models.ForeignKey(
        Provider, on_delete=models.CASCADE, limit_choices_to={"billing": True}
    )
    total_amt = models.DecimalField(
        max_digits=15,
        decimal_places=3,
        default=0,
        help_text="This is the total amount charged for the claim",
    )  # integer
    loaded = models.DateTimeField(auto_now=True)
    submitted = models.BooleanField(default=False)
    primary_diagnosis = models.ForeignKey(Dcodes, on_delete=models.CASCADE)

    objects = ClaimManager()

    def create_detail(
        self,
        ref,
        rendering,
        procedure_code,
        place_of_service,
        fromdate=datetime.now(),
        todate=datetime.now(),
        dx_pointer="1",
        units=1,
        amt=0,
        location=None,
        referrer=None,
        modifiers=None,
    ):

        detail, _ = Claim_Detail.objects.get_or_create(
            claim=self,
            ref=ref,
            rendering=rendering,
            procedure_code=Pcodes.objects.filter(code=procedure_code)[0],
            place_of_service=POScodes.objects.filter(code=place_of_service)[0],
            fromdate=fromdate,
            todate=todate,
            dx_pointer=dx_pointer,
            units=units,
            amt=amt,
            location=(
                rendering.provider.user.street_address if location is None else location
            ),
            referrer=referrer,
        )

        if modifiers is not None:
            for modifier in modifiers:
                Claim_Mx.objects.get_or_create(
                    claim=detail, modifier=Mcodes.objects.filter(code=modifier.code)[0]
                )

        return detail


class Claim_Detail(models.Model):

    claim = models.ForeignKey(Claim_Info, on_delete=models.CASCADE)
    ref = models.IntegerField(default=0)
    rendering = models.ForeignKey(Provider, on_delete=models.CASCADE)
    referrer = models.ForeignKey(
        Provider,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="Referrer",
    )
    procedure_code = models.ForeignKey(Pcodes, on_delete=models.CASCADE)
    place_of_service = models.ForeignKey(POScodes, on_delete=models.CASCADE)
    fromdate = models.DateTimeField(auto_now=False)
    todate = models.DateTimeField(auto_now=False)
    amt = models.DecimalField(
        max_digits=15,
        decimal_places=3,
        default=0,
        help_text="This is the amount charged for the procedure",
    )  # integer
    units = models.IntegerField(default=0)
    location = models.TextField(default="location", null=True, blank=True)
    dx_pointer = models.CharField(max_length=7, default=":")


class Claim_Dx(models.Model):

    claim = models.ForeignKey(Claim_Info, on_delete=models.CASCADE)
    ref = models.IntegerField(default=0)
    diagnosis = models.ForeignKey(Dcodes, on_delete=models.CASCADE)


class Claim_Mx(models.Model):

    claim = models.ForeignKey(Claim_Detail, on_delete=models.CASCADE)
    modifier = models.ForeignKey(Mcodes, on_delete=models.CASCADE)

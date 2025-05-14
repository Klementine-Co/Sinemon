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
from django.db.models import Q

from random import shuffle


from .CODES import *

from .claim import Claim_Info

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import datetime, timedelta

from base.models.license import *

from django.utils import timezone

# ACTIVITIES = (("N", "NO EXERTION"), ("L", "LIGHT"), ("M", "MODERATE"), ("V", "VIGOROUS"))

STATUSES = (
    ("ESC", "ESCROW"),
    ("RTC", "REQUEST TO CANCEL"),
    ("RD", "REQUEST DENIED"),
    ("RA", "REQUEST APPROVED"),
    ("STP", "SUMBITTED TO PUBLISH"),
    ("P", "PUBLISHED"),
)

SATISFIED = 6
NOTSATISFIED = -6
ECSTATIC = 8
DISAPPOINTED = -8
MOON = 12
LIVID = -12

COMMENT_TYPE = (
    (SATISFIED, "SATISFIED"),
    (NOTSATISFIED, "NOT SATISFIED"),
    (ECSTATIC, "ECSTATIC"),
    (DISAPPOINTED, "DISAPPOINTED"),
    (MOON, "OVER"),
    (LIVID, "LIVID"),
)


class Comment(models.Model):

    comment = models.CharField(max_length=128)
    comment_type = models.IntegerField(
        default=6, choices=COMMENT_TYPE, null=True, blank=True
    )
    response = models.CharField(max_length=128, null=True, blank=True)
    responded = models.DateTimeField(auto_now=False, null=True, blank=True)
    published = models.DateTimeField(auto_now=False, null=True, blank=True)
    submitted = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=65, choices=STATUSES, null=True, blank=True)
    time_limit = models.IntegerField(default=1)  # In Days
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)


ASKED = (("Y", "ASKING"), ("N", "NOT ASKED"), ("A", "ANSWERED"))


def validate_rating(value):
    if value != 1 and value != -1:
        raise ValidationError(
            _("%(value)s is not an valid rating"),
            params={"value": value},
        )


class Patientvisit(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    visit_date = models.DateTimeField(auto_now=True)
    counter = models.IntegerField(default=0)
    dr_rating = models.IntegerField(
        default=-1, null=True, blank=True, validators=[validate_rating]
    )
    staff_rating = models.IntegerField(
        default=-1, null=True, blank=True, validators=[validate_rating]
    )
    bedside_rating = models.IntegerField(
        default=-1, null=True, blank=True, validators=[validate_rating]
    )
    office_rating = models.IntegerField(
        default=-1, null=True, blank=True, validators=[validate_rating]
    )
    # approved_activity = models.CharField(max_length=11, choices=ACTIVITIES)
    commentt = models.ForeignKey(
        Comment, on_delete=models.CASCADE, default=None, blank=True, null=True
    )
    asked = models.CharField(default="N", choices=ASKED, max_length=11)
    billed = models.BooleanField(default=False)
    claim = models.ForeignKey(
        Claim_Info, on_delete=models.CASCADE, default=None, blank=True, null=True
    )

    def createProviderRatings(self):
        ProviderRatings.objects.create(prov=self.prov)

    def update(
        self,
        dr_rating,
        staff_rating,
        bedside_rating,
        office_rating,
        comment,
        counter,
        *args,
        **kwargs
    ):

        self.dr_rating = dr_rating
        self.staff_rating = staff_rating
        self.bedside_rating = bedside_rating
        self.office_rating = office_rating
        self.comment = comment
        self.counter = counter

        super().save(*args, **kwargs)

    def updateVisit(self, asked, *args, **kwargs):

        self.asked = asked
        # self.counter = counter

        super().save(*args, **kwargs)

    def comment_required(self):

        return self.counter == 1

    def getCount(self):
        count = 0

        for num in Patientvisit.objects.filter(
            prov=self.prov, member=self.member, counter__gt=0
        ):
            count = num.counter

        return count

    def comment(self, comment):

        self.comment = comment
        super().save(*args, **kwargs)

    def answer(self, member, prov, answer, id, *args, **kwargs):

        # print(member, prov, answer[0:1], id)
        Provider_reportcard.objects.create(
            member=member,
            prov=prov,
            reportcard=Reportcard.objects.filter(id=id)[0],
            answer=answer[0:1],
            visit=self,
        )

        self.asked = "A"
        super().save(*args, **kwargs)

    def getquestions(self):
        # Assuming the general code and taxonomy are both '100'
        general_code = "100"

        # Query for three general questions
        general_questions = Reportcard.objects.filter(
            Q(specialty_code=general_code) | Q(prov_taxonomy_code=general_code)
        ).order_by("?")[
            :3
        ]  # Randomize and limit to 3

        # Query for three provider-specific questions
        provider_questions = Reportcard.objects.filter(
            specialty_code=self.prov.specialty_code,
            prov_taxonomy_code=self.prov.prov_taxonomy_code,
        ).order_by("?")[
            :3
        ]  # Randomize and limit to 3

        # Combine the two querysets
        combined_questions = list(general_questions) + list(provider_questions)

        return combined_questions


ANSWERS = (
    ("Y", "YES"),
    ("N", "NO"),
)


class Reportcard(models.Model):

    specialty_code = models.TextField(
        db_column="SPECIALTY_CODE", blank=True, null=True, choices=SPECIALTY_CODES
    )  # Field name made lowercase.
    prov_taxonomy_code = models.TextField(
        db_column="PROV_TAXONOMY_CODE", blank=True, null=True, choices=TAXONOMY_CODES
    )  # Field name made lowercase.
    question = models.CharField(max_length=128, null=True, blank=True)
    correct_answer = models.CharField(
        max_length=3, choices=ANSWERS, null=True, blank=True
    )


class Provider_reportcard(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    reportcard = models.ForeignKey(Reportcard, on_delete=models.CASCADE)
    answer = models.CharField(max_length=3, choices=ANSWERS, null=True, blank=True)
    ask_date = models.DateTimeField(auto_now=True)
    visit = models.ForeignKey(Patientvisit, on_delete=models.CASCADE)
    answer_cnt = models.IntegerField(default=0, null=True, blank=True)
    question_score = models.IntegerField(default=0, null=True, blank=True)

    def setCorrect(self, *args, **kwargs):

        for x in Provider_reportcard.objects.filter(visit=self.visit):
            if x.answer == x.reportcard.correct_answer:
                self.answer_cnt += 1
            else:
                self.answer_cnt -= 1

        self.question_score = scorequestions(self.answer_cnt)

        super().save(*args, **kwargs)


def pct_change(old, new):
    return (new - old) / (old)


def scoreratings(oldvalue, newvalue, type):
    if oldvalue != 0:
        change = pct_change(oldvalue, newvalue)
        if change != 0:
            if abs(change) > 0.10 and change / abs(change) == 1:
                if type == "dr_rating":
                    return newvalue * 0.12 * (change / abs(change))
                if type == "staff_rating":
                    return newvalue * 0.03 * (change / abs(change))
                if type == "office_rating":
                    return newvalue * 0.03 * (change / abs(change))
                if type == "bedside_rating":
                    return newvalue * 0.06 * (change / abs(change))
            if abs(change) > 0.10 and change / abs(change) == -1:
                if type == "dr_rating":
                    return oldvalue * 0.16 * (change / abs(change))
                if type == "staff_rating":
                    return oldvalue * 0.04 * (change / abs(change))
                if type == "office_rating":
                    return oldvalue * 0.03 * (change / abs(change))
                if type == "bedside_rating":
                    return oldvalue * 0.08 * (change / abs(change))

        else:
            if newvalue / abs(newvalue) == 1:
                if type == "dr_rating":
                    return 40 * 0.12
                else:
                    return 8 * 0.12
            else:
                if type == "dr_rating":
                    return -40 * 0.12
                else:
                    return -8 * 0.12

    if type == "dr_rating":
        return newvalue * 0.12
    if type == "staff_rating":
        return newvalue * 0.03
    if type == "office_rating":
        return newvalue * 0.03
    if type == "bedside_rating":
        return newvalue * 0.06
    return 0


def getquestionrating(score):
    if score < 4:
        return "POOR"
    else:
        return "GOOD"


def scorequestions(sum):
    data = list(range(-6, 7, 1))
    # if sum < floor(np.percentile(data, 20)):
    #     return -6/1000
    if sum < floor(np.percentile(data, 80)):
        return -12 / 1000
    if sum < floor(np.percentile(data, 90)):
        return -1 / 1000
    if sum <= floor(np.percentile(data, 100)):
        return 3 / 1000


def scorecomments(oldv, newv):

    if pct_change(old=oldv, new=newv) >= 0.1:
        return (newv - oldv) * 0.20
    elif pct_change(old=oldv, new=newv) <= -0.1:
        return (newv - oldv) * 0.28


from django.db.models import Sum, Avg


class ProviderReportCardsManager(models.Manager):
    def __init__(self):
        super(ProviderReportCardsManager, self).__init__()

    def getValue(self, value, posvalue, negvalue, prevMonth=0, pattern=False):
        from math import ceil

        tot = negvalue + posvalue
        pospct = posvalue / tot
        negpct = negvalue / tot
        # print('pos pct {}\nneg pct {}'.format(pospct, negpct))
        if (prevMonth < 0 or pattern == True) and pospct > 0.91:
            return 0
        if negvalue <= 0:
            return value
        else:
            rtrn = (value * pospct) - ((value) + (value * negpct))  # +(.5 * value) + 2)
            if rtrn > value:
                return value
            elif rtrn < -1 * value:
                return -1 * value
            else:
                return ceil(rtrn)

    points = {
        "probation": {
            "max": 240,
            "fresh_year": 60,
            "past_habitual": 30,
            "past_habitual_max": 90,
        },
        "suspension": {
            "max": 280,
            "fresh_year": 70,
            "past_habitual": 35,
            "past_habitual_max": 105,
        },
        "felony judgement": {
            "max": 720,
            "fresh_year": 90,
            "past_habitual": 45,
            "past_habitual_max": 135,
        },
        "misdemeanor judgement": {
            "max": 360,
            "fresh_year": 70,
            "past_habitual": 35,
            "past_habitual_max": 105,
        },
        "reprimand": {
            "max": 30,
            "fresh_year": 30,
            "past_habitual": 15,
            "past_habitual_max": 15,
        },
        "citation": {
            "max": 135,
            "fresh_year": 45,
            "past_habitual": 23,
            "past_habitual_max": 69,
        },
        "settlement_judgement": {
            "max": 30,
            "fresh_year": 30,
            "past_habitual": 15,
            "past_habitual_max": 15,
        },
        "dr_rating": {
            "max": 6,
            "fresh_year": 6,
            "past_habitual": 0,
            "past_habitual_max": 0,
        },
        "bedside_rating": {
            "max": 6,
            "fresh_year": 6,
            "past_habitual": 0,
            "past_habitual_max": 0,
        },
        "staff_rating": {
            "max": 3,
            "fresh_year": 3,
            "past_habitual": 0,
            "past_habitual_max": 0,
        },
        "office_rating": {
            "max": 3,
            "fresh_year": 3,
            "past_habitual": 0,
            "past_habitual_max": 0,
        },
    }
    Ltypes = [
        typ
        for typ in list(points.keys())
        if "rating" not in typ and "judgement" not in typ
    ]
    Rtypes = [typ for typ in list(points.keys()) if "rating" in typ]

    def distance(self, x, y):
        return (y - x).days

    def between(self, x, y, z):
        if x >= y and x <= z:
            return 1
        else:
            return 0

    def updates(self, start, end, update, current=datetime.now(tz=timezone.utc).date()):

        if self.between(update, start, end) == 1 and current > end:
            arg1 = self.distance(update, end)  # >= 0
            arg2 = self.distance(end, current)  # >= 0 year in = arg2

            return round(arg1 / 365), round(arg2 / 365), round(arg2 / 365)
        if update > end:
            arg1 = self.distance(update, end)  # < 0
            arg2 = self.distance(update, current)  # >= 0 year in = abs(arg1) + arg2

            return (
                round(arg1 / 365),
                round(arg2 / 365),
                (abs(round(arg1 / 365)) + round(arg2 / 365)),
            )
        if (
            self.between(update, start, end) == 1
            and self.between(current, start, end) == 1
        ):
            arg1 = self.distance(update, current)  # > 0
            arg2 = self.distance(end, current)  # <= 0 year in = arg1

            return round(arg1 / 365), round(arg2 / 365), round(arg1 / 365)

        return 0, 0, 0

    def getLScore(self, type, score, start_date, end_date, update_date):

        current_multiplier, past_multiplier, year_in = self.updates(
            start_date, end_date, update_date
        )
        max_pts = self.points.get(type).get("max")
        max_past_pts = self.points.get(type).get("past_habitual_max")
        max_yrs = round(max_pts / self.points.get(type).get("fresh_year"))
        max_past_yrs = round(max_past_pts / self.points.get(type).get("past_habitual"))
        fresh_yr_pts_currrent_ded = 0
        fresh_yr_pts_past_ded = 0

        # print(max_pts, self.points.get(type).get('fresh_year'), current_multiplier, past_multiplier, year_in)

        if current_multiplier > 0:
            fresh_yr_pts_currrent_ded = (
                self.points.get(type).get("fresh_year") * current_multiplier
            )
        if past_multiplier > 0 and current_multiplier > 0 and past_multiplier < 6:
            fresh_yr_pts_past_ded = (
                self.points.get(type).get("past_habitual")
            ) * past_multiplier
            score -= fresh_yr_pts_currrent_ded
            if year_in <= max_past_yrs:
                score -= fresh_yr_pts_past_ded
            # print(current_multiplier, past_multiplier, year_in, score, fresh_yr_pts_currrent_ded, fresh_yr_pts_past_ded)
            return score
        elif past_multiplier > 0 and past_multiplier + abs(current_multiplier) < 6:
            fresh_yr_pts_past_ded = (
                self.points.get(type).get("past_habitual")
            ) * past_multiplier
            score -= fresh_yr_pts_currrent_ded
            if year_in <= max_past_yrs:
                score -= fresh_yr_pts_past_ded
            # print(current_multiplier, past_multiplier, year_in, score, fresh_yr_pts_currrent_ded, fresh_yr_pts_past_ded)
            return score
        if year_in <= max_yrs:
            score -= fresh_yr_pts_currrent_ded
            # print(current_multiplier, past_multiplier, year_in, score, fresh_yr_pts_currrent_ded, fresh_yr_pts_past_ded)
            return score

        return score

    def getRating(self, value):
        import numpy as np

        if value < round(np.percentile([0, 656, 806, 1050], 100 * (1 / 3))):
            return "POOR"
        elif value < round(np.percentile([0, 656, 806, 1050], 100 * (2 / 3))):
            return "FAIR"
        elif value >= round(np.percentile([0, 656, 806, 1050], 100 * (2 / 3))):
            return "EXCELLENT"

    def licenseScore(self, provid):
        """
        Update license score
        """
        # prov = Provider.objects.filter(provider_id=provid)[0]
        item, created = ProviderRatings.objects.get_or_create(prov_id=provid)
        provider_ratings = item
        probations = (
            Probations.objects.filter(prov_id=provid)
            .values_list("effective_date", "end_date", "casenumber", "prov_id")
            .distinct()
        )
        citations = (
            Citations.objects.filter(prov_id=provid)
            .values_list("dateresolved", "datecitationissued", "cause", "prov_id")
            .distinct()
        )
        # felonies = Convictions.objects.filter(prov_id=provid, classs='FELONY').values_list('effective_date','court', 'classs', 'prov_id').distinct()
        # misdemeanors = Convictions.objects.filter(prov_id=provid, classs='"MISDEMEANOR"').values_list('effective_date','court', 'classs', 'prov_id').distinct()

        score = provider_ratings.score
        update_date = provider_ratings.update_date

        for item in probations:
            # print('\n\n\n',item)
            # getLScore(self, type, score, start_date, end_date, update_date)
            if provider_ratings.update_date is None:
                if item[1].date() < datetime.now(tz=timezone.utc).date():
                    update_date = item[1]
                else:
                    if (
                        datetime.now(tz=timezone.utc).date() - timedelta(days=365)
                        >= item[0].date()
                    ):
                        update_date = datetime.now(tz=timezone.utc) - timedelta(
                            days=365
                        )
                    else:
                        update_date = item[0]
            if item[3] == 1673:
                print(
                    "\n\n\n Prob Update Date: ",
                    self.Ltypes[0],
                    score,
                    item[0].date(),
                    item[1].date(),
                    update_date.date(),
                    "\n\n\n",
                )
            score = self.getLScore(
                self.Ltypes[0],
                score,
                item[0].date(),
                item[1].date(),
                update_date.date(),
            )

        for item in citations:
            # print('\n\n\n',item)
            if item[0] is None:
                # print(item[0], item)
                item = list(item)
                item[0] = datetime.now(tz=timezone.utc)
                item = tuple(item)

            # print('\n\nprovider update date\n\n', provider_ratings.update_date, provider_ratings.id)
            if provider_ratings.update_date is None:
                if item[0].date() < datetime.now(tz=timezone.utc).date():
                    update_date = item[0]
                else:
                    if (
                        datetime.now(tz=timezone.utc).date() - timedelta(days=365)
                        >= item[1].date()
                    ):
                        update_date = datetime.now(tz=timezone.utc) - timedelta(
                            days=365
                        )
                    else:
                        update_date = item[1]
            if item[3] == 1673:
                print(
                    "\n\n\n Cit Update Date: ",
                    self.Ltypes[0],
                    score,
                    item[1].date(),
                    item[0].date(),
                    update_date.date(),
                    "\n\n\n",
                )
            score = self.getLScore(
                self.Ltypes[3],
                score,
                item[1].date(),
                item[0].date(),
                update_date.date(),
            )

        provider_ratings.update_date = datetime.now(tz=timezone.utc)
        provider_ratings.score = score
        provider_ratings.rating = self.getRating(score)
        provider_ratings.save()

    def create_reportcard(self, provid):
        """
        Creates reportcard
        """
        prov = Provider.objects.filter(provider_id=provid)[0]
        report_date = datetime.now(tz=timezone.utc)
        today = datetime.now(tz=timezone.utc)
        one_month_ago = today + timedelta(days=-30)
        one_month_ago_date = datetime(
            one_month_ago.year, one_month_ago.month, one_month_ago.day
        )
        two_months_ago = datetime(
            one_month_ago.year, one_month_ago.month - 1, one_month_ago.day
        )
        two_months_ago_date = two_months_ago.date()

        patientvisits_old = Patientvisit.objects.filter(
            prov__provider_id=provid,
            visit_date__lte=one_month_ago_date,
            visit_date__gte=two_months_ago_date,
        )

        provider_reportcards_old = Provider_reportcard.objects.filter(
            visit__in=patientvisits_old
        )

        # print(prov, patientvisits_old, provider_reportcards_old)

        if not patientvisits_old.exists() or not provider_reportcards_old.exists():
            print("Must have visits and report cards", provid)
            return None
        else:
            dr_ratings = [x.dr_rating for x in patientvisits_old]
            bedside_ratings = [x.bedside_rating for x in patientvisits_old]
            staff_ratings = [x.staff_rating for x in patientvisits_old]
            office_ratings = [x.office_rating for x in patientvisits_old]

            dr_polarity = (
                1
                if len([x for x in dr_ratings if x == 1]) / len(dr_ratings) > 0.91
                else -1
            )
            bedside_polarity = (
                1
                if len([x for x in bedside_ratings if x == 1]) / len(bedside_ratings)
                > 0.91
                else -1
            )
            staff_polarity = (
                1
                if len([x for x in staff_ratings if x == 1]) / len(staff_ratings) > 0.91
                else -1
            )
            office_polarity = (
                1
                if len([x for x in office_ratings if x == 1]) / len(office_ratings)
                > 0.91
                else -1
            )

            import re

            pattrn = r"1 -1 1 -1$"
            pattrn2 = r"-1 1 -1 1$"
            ptrn = re.compile(pattrn)
            ptrn2 = re.compile(pattrn2)

            drrating = " ".join(str(x) for x in dr_ratings)
            bedsiderating = " ".join(str(x) for x in bedside_ratings)
            staffrating = " ".join(str(x) for x in staff_ratings)
            officerating = " ".join(str(x) for x in office_ratings)

            dr_score = self.getValue(
                6,
                len([x for x in dr_ratings if x == 1]),
                len([x for x in dr_ratings if x == -1]),
                pattern=len(ptrn.findall(drrating)) > 0
                or len(ptrn2.findall(drrating)) > 0,
                prevMonth=1,
            )

            bedside_score = self.getValue(
                6,
                len([x for x in bedside_ratings if x == 1]),
                len([x for x in bedside_ratings if x == -1]),
                pattern=len(ptrn.findall(bedsiderating)) > 0
                or len(ptrn2.findall(bedsiderating)) > 0,
                prevMonth=1,
            )

            staff_score = self.getValue(
                6,
                len([x for x in staff_ratings if x == 1]),
                len([x for x in staff_ratings if x == -1]),
                pattern=len(ptrn.findall(staffrating)) > 0
                or len(ptrn2.findall(staffrating)) > 0,
                prevMonth=1,
            )

            office_score = self.getValue(
                6,
                len([x for x in office_ratings if x == 1]),
                len([x for x in office_ratings if x == -1]),
                pattern=len(ptrn.findall(officerating)) > 0
                or len(ptrn2.findall(officerating)) > 0,
                prevMonth=1,
            )

            comments_avg_old = patientvisits_old.aggregate(
                Avg("commentt__comment_type")
            )["commentt__comment_type__avg"]

            comments_score = comments_avg_old if comments_avg_old is not None else 0

            provider_reportcards_old_avg = provider_reportcards_old.aggregate(
                Avg("question_score"),
            )["question_score__avg"]

            question_score = (
                round(provider_reportcards_old_avg, 4)
                if provider_reportcards_old_avg is not None
                else 0
            )

            provider_reportcard_question_ratings = provider_reportcards_old.values(
                "reportcard__id"
            ).annotate(
                answer_cnt_avg=Avg("answer_cnt"),
            )

            for x in provider_reportcard_question_ratings:

                reportcard = Reportcard.objects.filter(id=x.get("reportcard__id"))[0]
                question_avg = x.get("answer_cnt_avg")
                question_rating = getquestionrating(x.get("answer_cnt_avg"))
                prov = prov
                report_date = report_date
                ProviderQuestionsReportCard.objects.create(
                    reportcard=reportcard,
                    question_avg=question_avg,
                    question_rating=question_rating,
                    prov=prov,
                    report_date=report_date,
                )

            ProviderReportCards.objects.create(
                comments_score=comments_score,
                questions_score=question_score,
                staff_score=staff_score,
                office_score=office_score,
                bedside_score=bedside_score,
                dr_score=dr_score,
                prov=prov,
                report_date=report_date,
            )
            item, created = ProviderRatings.objects.get_or_create(prov_id=provid)
            provider_ratings = item
            provider_ratings.dr_rating = provider_ratings.dr_rating + dr_score
            provider_ratings.bedside_rating = (
                provider_ratings.bedside_rating + bedside_score
            )
            provider_ratings.staff_rating = provider_ratings.staff_rating + staff_score
            provider_ratings.office_rating = (
                provider_ratings.office_rating + office_score
            )
            provider_ratings.score = (
                dr_score
                + bedside_score
                + staff_score
                + office_score
                + provider_ratings.score
            )
            provider_ratings.rating = self.getRating(
                dr_score
                + bedside_score
                + staff_score
                + office_score
                + provider_ratings.score
            )
            provider_ratings.save()

            ProviderRating.objects.create(
                prov=prov,
                rating_type="DR",
                polarity=dr_polarity,
                value=provider_ratings.dr_rating,
                update_date=datetime.now(tz=timezone.utc),
            )
            ProviderRating.objects.create(
                prov=prov,
                rating_type="BEDSIDE",
                polarity=bedside_polarity,
                value=provider_ratings.bedside_rating,
                update_date=datetime.now(tz=timezone.utc),
            )
            ProviderRating.objects.create(
                prov=prov,
                rating_type="STAFF",
                polarity=staff_polarity,
                value=provider_ratings.staff_rating,
                update_date=datetime.now(tz=timezone.utc),
            )
            ProviderRating.objects.create(
                prov=prov,
                rating_type="OFFICE",
                polarity=office_polarity,
                value=provider_ratings.office_rating,
                update_date=datetime.now(tz=timezone.utc),
            )


class ProviderReportCards(models.Model):

    comments_score = models.IntegerField(default=0)
    questions_score = models.IntegerField(default=0)
    staff_score = models.IntegerField(default=0)
    office_score = models.IntegerField(default=0)
    bedside_score = models.IntegerField(default=0)
    dr_score = models.IntegerField(default=0)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    report_date = models.DateTimeField(auto_now=False)

    objects = ProviderReportCardsManager()


RATINGS = (
    ("POOR", "POOR"),
    ("GOOD", "GOOD"),
)

PRATINGS = (
    ("POOR", "POOR"),
    ("FAIR", "FAIR"),
    ("EXCELLENT", "EXCELLENT"),
)


class ProviderRatings(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    dr_rating = models.IntegerField(default=72)
    staff_rating = models.IntegerField(default=72)
    bedside_rating = models.IntegerField(default=72)
    office_rating = models.IntegerField(default=72)
    rating = models.CharField(choices=PRATINGS, max_length=9, null=True, blank=True)
    score = models.IntegerField(default=662)
    update_date = models.DateTimeField(auto_now=False, null=True, blank=True)


TYPES_ = (
    ("DR", "DR"),
    ("BEDSIDE", "BEDSIDE"),
    ("STAFF", "STAFF"),
    ("OFFICE", "OFFICE"),
)


class ProviderRating(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    rating_type = models.CharField(max_length=7, choices=TYPES_, null=True, blank=True)
    polarity = models.IntegerField(default=0, null=True, blank=True)
    value = models.IntegerField(default=0, null=True, blank=True)
    update_date = models.DateTimeField(auto_now=False, null=True, blank=True)


class ProviderRatingHistory(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    dr_polarity = models.IntegerField(default=0, null=True, blank=True)
    staff_polarity = models.IntegerField(default=0, null=True, blank=True)
    bedside_polarity = models.IntegerField(default=0, null=True, blank=True)
    office_polarity = models.IntegerField(default=0, null=True, blank=True)
    updated_date = models.DateTimeField(auto_now=False, null=True, blank=True)
    loaded_date = models.DateTimeField(auto_now=True)
    score = models.IntegerField(default=0, null=True, blank=True)


class ProviderQuestionsReportCard(models.Model):

    reportcard = models.ForeignKey(Reportcard, on_delete=models.CASCADE)
    question_avg = models.IntegerField(default=0)
    question_rating = models.CharField(
        max_length=4, choices=RATINGS, null=True, blank=True
    )
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    report_date = models.DateTimeField(auto_now=False)

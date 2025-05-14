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


class MedInsurance(models.Model):

    insurer = models.TextField()
    id_member = models.TextField()
    group_no = models.TextField()
    benefit_plan = models.TextField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    card = models.FileField(
        upload_to="medical_insurance/%Y/%m/%d/", null=True, blank=True
    )
    uploaded = models.DateTimeField(auto_now=True)

    def update(self, insurer, id_member, group_no, benefit_plan, card, *args, **kwargs):

        self.insurer = insurer
        self.id_member = id_member
        self.group_no = group_no
        self.benefit_plan = benefit_plan
        self.card = card

        super().save(*args, **kwargs)


class RxInsurance(models.Model):

    insurer = models.TextField()
    id_member = models.TextField()
    group_no = models.TextField()
    benefit_plan = models.TextField()
    rxbin = models.TextField()
    rxpcn = models.TextField()
    rxgrp = models.TextField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    card = models.FileField(upload_to="rx_insurance/%Y/%m/%d/", null=True, blank=True)
    uploaded = models.DateTimeField(auto_now=True)

    def update(
        self,
        insurer,
        id_member,
        group_no,
        benefit_plan,
        rxbin,
        rxpcn,
        rxgrp,
        card,
        *args,
        **kwargs
    ):

        self.insurer = insurer
        self.id_member = id_member
        self.group_no = group_no
        self.benefit_plan = benefit_plan
        self.rxbin = rxbin
        self.rxpcn = rxpcn
        self.rxgrp = rxgrp
        self.card = card

        super().save(*args, **kwargs)


class RxDiscount(models.Model):

    insurer = models.TextField()
    id_member = models.TextField()
    rxbin = models.TextField()
    rxpcn = models.TextField()
    rxgrp = models.TextField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    card = models.FileField(upload_to="rx_discount/%Y/%m/%d/", null=True, blank=True)
    uploaded = models.DateTimeField(auto_now=True)

    def update(self, insurer, id_member, rxbin, rxpcn, rxgrp, card, *args, **kwargs):

        self.insurer = insurer
        self.id_member = id_member
        self.rxbin = rxbin
        self.rxpcn = rxpcn
        self.rxgrp = rxgrp
        self.card = card

        super().save(*args, **kwargs)

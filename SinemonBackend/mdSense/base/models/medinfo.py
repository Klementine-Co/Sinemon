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


class Prescription(models.Model):

    prescribed_date = models.DateTimeField(auto_now=False)
    ndc = models.IntegerField(default=0)
    expiration_date = models.DateTimeField(auto_now=False)
    lot_no = models.TextField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    prescriber = models.IntegerField(
        blank=True, null=True, help_text="National Provider Identifier"
    )

    def update(
        self, prescribed_date, ndc, expiration_date, lot_no, prescriber, *args, **kwargs
    ):

        self.prescribed_date = prescribed_date
        self.ndc = ndc
        self.prescriber = prescriber
        self.expiration_date = expiration_date
        self.lot_no = lot_no

        super().save(*args, **kwargs)


MEASUREMENTS = (("S", "Standard"), ("M", "Metric"))


class BodyComp(models.Model):

    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    bmi = models.DecimalField(
        max_digits=8,
        decimal_places=3,
        default=0,
        help_text="This is a regular decimal number (float) e.g. 24.4 BMI -> 24.4",
    )  # integer
    bf = models.DecimalField(
        max_digits=8,
        decimal_places=3,
        default=0,
        help_text="This is a regular decimal number (float) e.g. 25.3% BF -> 25.3",
    )  # percent
    height = models.DecimalField(
        max_digits=8,
        decimal_places=3,
        default=0,
        help_text="inches for standard / centimeters for metric",
    )  # inches for standard / centimeters for metric
    weight = models.DecimalField(
        max_digits=8,
        decimal_places=3,
        default=0,
        help_text="lbs for standard / kgs for metric",
    )  # lbs for standard / kgs for metric
    measurement = models.CharField(
        max_length=8,
        default="Standard",
        choices=MEASUREMENTS,
        help_text="standard / metric",
    )  # standard / metric
    updated = models.DateTimeField(auto_now=True)

    def update(self, bmi, bf, height, weight, *args, **kwargs):

        self.bmi = bmi
        self.bf = bf
        self.height = height
        self.weight = weight

        super().save(*args, **kwargs)


class Vaccinations(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    vaccination = models.TextField()
    vaccination_date = models.DateTimeField(auto_now=False)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)


ACTIVITIES = (
    ("N", "NO EXERTION"),
    ("L", "LIGHT"),
    ("M", "MODERATE"),
    ("V", "VIGOROUS"),
)


class Visits(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    visit_date = models.DateTimeField(auto_now=False)
    approved_activity = models.CharField(max_length=11, choices=ACTIVITIES)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)


# TODO provide a way for providers to link previous note to avoid redundant form fill outs
class mdNotes(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    chief_complaint = models.TextField(null=True, blank=True)
    history = models.TextField(null=True, blank=True)
    exam = models.TextField(null=True, blank=True)
    assessment = models.TextField(null=True, blank=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    uploaded = models.DateTimeField(auto_now=True)


LAB_STATUSES = (("O", "ORDERED"), ("C", "COMPLETE"))


import re

# import base64
from base64 import b64decode
import io
from PIL import Image
from datetime import datetime as dt
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile


# def user_directory_path(filename):
#     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return 'labs/%Y/%m/%d/{1}'.format(filename.name)

# class MyModel(models.Model):
#     upload = models.FileField(upload_to=user_directory_path)


class labs(models.Model):

    prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    lab = models.FileField(upload_to="labs/%Y/%m/%d/")
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    status = models.CharField(max_length=8, choices=LAB_STATUSES, default="O")
    uploaded = models.DateTimeField(auto_now=True)
    brief_desc = models.TextField(null=True, blank=True)

    def update(self, prov, lab, status, brief_desc, *args, **kwargs):

        self.prov = Provider.objects.filter(provider_id=prov)[0]

        lab_curr = re.search(r"[\.\w-]+$", str(self.lab))
        lab_curr = lab_curr.group(0) if lab_curr is not None else lab_curr

        # if self.lab != None and lab != None:
        #     lab_curr = re.search(r"[\.\w-]+$", str(self.lab))
        #     lab_curr = lab_curr.group(0) if lab_curr is not None else lab_curr

        #     print( 'curr', lab_curr, 'new', lab)
        #     if lab_curr != lab:
        #         self.lab = lab
        # else:
        #     self.lab = lab

        if isinstance(lab, dict):
            if (lab.get("name") != lab_curr and lab_curr != None) or (
                lab_curr == None and lab != None
            ):
                size = lab.get("dimen")
                content = lab.get("content")
                data = ContentFile(b64decode(content), name=lab.get("name"))
                self.lab.delete()
                self.lab = data
                # if lab.get('name').endswith('.jpg') != None or lab.get('name').endswith('.jpeg') != None or lab.get('name').endswith('.png') != None:
                #     buf = io.BytesIO(b64decode(content))
                #     img = Image.open(buf)
                #     # filename = '/media/labs'+dt.now().strftime('/%Y/%m/%d/')+lab.get('name')
                #     # img.save(filename)
                #     # img = Image(filename)
                #     img.show()
                #     print(lab.get('name'), lab.get('size'))

                #     data = ContentFile(b64decode(content), name=lab.get('name'))

                #     # img = InMemoryUploadedFile(img,
                #     #                         'lab',
                #     #                         lab.get('name'),
                #     #                         'image/png',
                #     #                         lab.get('size'), None)
                #     self.lab = data
                # self.lab = img

        # img = Image.frombytes('L', (size.get('width'),size.get('height')), content)
        # img = Image.open(lab.get('content'))
        # print(lab, 'lab2')
        # self.lab = lab

        self.status = status
        self.brief_desc = brief_desc

        super().save(*args, **kwargs)

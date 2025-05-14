from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now
from base.models.baseuser import BaseUser_, BaseUser
from base.baseuser import deferred


# class CodesManager(models.Manager):
#     def add_proc(self, email, username=None, password=None):
#         """
#         Creates and saves a User with the given email, date of
#         birth and password.
#         """
#         if not email:
#             raise ValueError('Users must have an email address')

#         user = self.model(
#             email=self.normalize_email(email),
#             username=username,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user


class Pcodes(models.Model):

    code = models.CharField(max_length=9)
    desc = models.TextField()
    cat_desc = models.CharField(max_length=32)
    cat = models.TextField()
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )
    # objects = CodesManager()

    def __str__(self):
        return f"{self.code} - {self.desc}"


class POScodes(models.Model):

    code = models.CharField(max_length=2)
    desc = models.TextField()
    cat_desc = models.TextField()
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )
    # objects = CodesManager()

    def __str__(self):
        return f"{self.code} - {self.desc}"


class Mcodes(models.Model):

    code = models.CharField(max_length=2)
    desc = models.TextField()
    cat_desc = models.CharField(max_length=1)
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )
    # objects = CodesManager()

    def __str__(self):
        return f"{self.code} - {self.desc}"


class Dcodes(models.Model):

    code = models.CharField(max_length=9)
    desc = models.TextField()
    cat_code = models.CharField(max_length=9)
    cat_desc = models.TextField()
    cat = models.CharField(max_length=256)
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )
    # objects = CodesManager()

    def __str__(self):
        return f"{self.code} - {self.desc}"


# class Mcodes(models.Model):

#     code = models.CharField( max_length=2)
#     desc = models.TextField()
#     load_date =  models.DateTimeField(auto_now=True)
#     created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'is_staff': True})
#     # objects = CodesManager()


#     def __str__(self):
#         return  f"{self.code} - {self.desc}"

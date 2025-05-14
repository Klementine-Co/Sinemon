from django.db import models

# from django.conf import settings
# from django.shortcuts import reverse
# from django.utils.timezone import now
# from decimal import *
# from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser

# from base.models.provider import Provider
# from base.models.member import Member
from base.baseuser import deferred


class Connection(models.Model):

    conn_id = models.CharField(default=None, max_length=256, null=True, blank=True)
    time = models.DateTimeField(auto_now=True)
    connected = models.BooleanField(default=False)
    user = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="conn_user"
    )

    def update_conn_id(self, id):
        self.conn_id = id
        self.connected = True
        super().save()

    def disconnect(self):
        self.connected = False
        self.conn_id = None
        super().save()

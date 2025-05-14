from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUserModel
from base.baseuser import deferred
from base.models.provider import Provider
from base.models.member import Member


class VoteManager(models.Manager):
    def __init__(self):
        super(VoteManager, self).__init__()

    def get_or_create_from_request(self, request, mem, prov, vote=0):

        if mem is None:
            if request.baseuser.is_visitor:
                request.baseuser = BaseUserModel.objects.get_or_create_from_request(
                    request
                )
                print(request.baseuser)
        else:
            vote_ = super().filter(member=mem, prov=prov)
            if vote_.exists() == True:
                vote_ = vote_[0]
                if vote_.vote == vote:
                    return vote_
            else:
                vote_ = None
            print()
            print("_")

            provider = Provider.objects.get(provider_id=prov.provider_id)
            votes = provider.votee

            if vote_ is not None:
                # if created_ == False:
                if vote_.direction == True:  # Up +
                    # print(votes.vote, vote_[0].vote)
                    votes -= vote_.vote
                    vote_.vote = vote
                    vote_.direction = vote > 0
                    vote_.save()
                    # self.save()
                else:  # Down -
                    # print(votes.vote, vote_[0].vote)
                    votes -= vote_.vote
                    vote_.vote = vote
                    vote_.direction = vote > 0
                    vote_.save()
                    # self.save()

                print(vote_.vote, vote)
                votes += vote
                provider.votee = votes
                provider.save()
                return vote_
            else:
                vote_ = super().create(
                    member=mem, prov=prov, vote=vote, direction=(vote > 0)
                )
                vote_.save()
                votes += vote
                provider.votee = votes
                provider.save()
                return vote_

            # else:
            #     vote_.vote = vote
            #     vote_.direction = (vote > 0)
            #     vote_.save()

            # if vote < 0:
            #     direction = False
            # else:
            #     direction = True


class Vote(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
    direction = models.BooleanField(default=True)
    vote = models.IntegerField(default=0)
    received_date = models.DateTimeField(auto_now=True)
    objects = VoteManager()

    def __str__(self):
        return f"{self.prov.__str__()} {self.vote}"


# class Votes(models.Model):

#     prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
#     votes = models.IntegerField(default=0)
#     objects = VoteManager()


#     def __str__(self):
#         return f"{self.prov.__str__()} {self.votes}"

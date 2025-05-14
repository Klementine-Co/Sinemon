from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.baseuser import deferred
from base.models.license import License


LICENSE_STATUS_2 = (
    ("10", "INACTIVE-INCARCERATED AFTER CONV OF MISD"),
    ("38", "VOLUNTARY LIMITATIONS ON PRACTICE"),
    ("46", "LICENSING PLR ISSUED(NON DISCIPLINARY)"),
    ("47", "CITATION RESOLVED"),
    ("48", "PUBLIC REPRIMAND"),
    ("49", "CITATION ISSUED"),
    ("50", "ACCUSATION FILED"),
    ("51", "Decision Pending Effective Date"),
    ("52", "REVOKED"),
    ("53", "PROBATION - LICENSEE PLACED ON PROBATION"),
    ("54", "SUSPENDED"),
    ("55", "Suspended - Pursuant to B&P Code 494.5"),
    ("56", "OTHER DISCIPLINARY DECISION"),
    ("57", "SURRENDER OF LICENSE"),
    ("58", "STAY ORDR ISSUED STOP EXEC. OF DECISION"),
    ("59", "IF CERTAIN SPEC COND ARE MET  PROB BEGIN"),
    ("60", "PROB/SUSP-PROB INCLUDES ACTUAL SUSP"),
    ("61", "NON-COMPLETION OF PROBATION"),
    ("62", "DECISION - BOARD DECISION SET ASIDE"),
    ("63", "PRACT TEMP RESTR/SUSP BY ADMIN LAW JUDGE"),
    ("64", "PRACT TEMP RESTR OR SUSP BY COURT JUDGE"),
    ("65", "AUTOMATIC SUSPENSION ORDER"),
    ("66", "Court Order"),
    ("67", "PC23 ORDER"),
    ("68", "SUSP BY ANOTHER STATE OR FED GOVERNMENT"),
    ("70", "LIMITATIONS ON PRACTICE"),
    ("71", "PROBATION COMPLETED"),
    ("76", "MISDEMEANOR CONVICTION"),
    ("77", "FELONY CONVICTION"),
    ("78", "Admin Action by Other State/Fed Gov't"),
    ("79", "MALPRACTICE JUDGMENT"),
    ("80", "HOSPITAL DISCIPLINE PER B&P CDE SECT 805"),
    ("81", "ARBITRATION AWARD"),
    ("82", "MALPRACTICE SETTLEMENTS"),
    ("83", "PROBATIONARY LICENSE"),
    ("9", "INACTIVE"),
    ("91", "PRIOR PROBATION COMPLETED"),
)


class Case(models.Model):

    case_num = models.CharField(max_length=36, unique=True)
    license = models.ForeignKey(License, on_delete=models.CASCADE)
    case_status = models.CharField(max_length=65, choices=LICENSE_STATUS_2)
    effective_date = models.DateTimeField(auto_now=False)
    open = models.BooleanField(default=True)
    negative = models.BooleanField(default=False)

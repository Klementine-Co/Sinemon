from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_  # , BaseUser
from base.baseuser import deferred
from base.models.provider import Provider


STATES = (
    ("Alabama", "Alabama"),
    ("Alaska", "Alaska"),
    ("Arizona", "Arizona"),
    ("Arkansas", "Arkansas"),
    ("California", "California"),
    ("Colorado", "Colorado"),
    ("Connecticut", "Connecticut"),
    ("Delaware", "Delaware"),
    ("Florida", "Florida"),
    ("Georgia", "Georgia"),
    ("Hawaii", "Hawaii"),
    ("Idaho", "Idaho"),
    ("Illinois", "Illinois"),
    ("Indiana", "Indiana"),
    ("Iowa", "Iowa"),
    ("Kansas", "Kansas"),
    ("Kentucky", "Kentucky"),
    ("Louisiana", "Louisiana"),
    ("Maine", "Maine"),
    ("Maryland", "Maryland"),
    ("Massachusetts", "Massachusetts"),
    ("Michigan", "Michigan"),
    ("Minnesota", "Minnesota"),
    ("Mississippi", "Mississippi"),
    ("Missouri", "Missouri"),
    ("Montana", "Montana"),
    ("Nebraska", "Nebraska"),
    ("Nevada", "Nevada"),
    ("New Hampshire", "New Hampshire"),
    ("New Jersey", "New Jersey"),
    ("New Mexico", "New Mexico"),
    ("New York", "New York"),
    ("North Carolina", "North Carolina"),
    ("North Dakota", "North Dakota"),
    ("Ohio", "Ohio"),
    ("Oklahoma", "Oklahoma"),
    ("Oregon", "Oregon"),
    ("Pennsylvania", "Pennsylvania"),
    ("Rhode Island", "Rhode Island"),
    ("South Carolina", "South Carolina"),
    ("South Dakota", "South Dakota"),
    ("Tennessee", "Tennessee"),
    ("Texas", "Texas"),
    ("Utah", "Utah"),
    ("Vermont", "Vermont"),
    ("Virginia", "Virginia"),
    ("Washington", "Washington"),
    ("West Virginia", "West Virginia"),
    ("Wisconsin", "Wisconsin"),
    ("Wyoming", "Wyoming"),
)


LICENSE_STATUS_1 = (
    ("20", "Current"),
    ("22", "CurrentTemp - FamilySupport"),
    ("31", "Family Support Suspension"),
    ("45", "Delinquent"),
    ("50", "Cancelled"),
    ("51", "Retired"),
    ("60", "Denied Renewal"),
    ("63", "Surrendered"),
    ("65", "Revoked"),
    ("85", "Deceased"),
)


# LICENSE_STATUS_2 = (("10", "INACTIVE-INCARCERATED AFTER CONV OF MISD"),
# ("38", "VOLUNTARY LIMITATIONS ON PRACTICE"),
# ("46", "LICENSING PLR ISSUED(NON DISCIPLINARY)"),
# ("47", "CITATION RESOLVED"),
# ("48", "PUBLIC REPRIMAND"),
# ("49", "CITATION ISSUED"),
# ("50", "ACCUSATION FILED"),
# ("51", "Decision Pending Effective Date"),
# ("52", "REVOKED"),
# ("53", "PROBATION - LICENSEE PLACED ON PROBATION"),
# ("54", "SUSPENDED"),
# ("55", "Suspended - Pursuant to B&P Code 494.5"),
# ("56", "OTHER DISCIPLINARY DECISION"),
# ("57", "SURRENDER OF LICENSE"),
# ("58", "STAY ORDR ISSUED STOP EXEC. OF DECISION"),
# ("59", "IF CERTAIN SPEC COND ARE MET  PROB BEGIN"),
# ("60", "PROB/SUSP-PROB INCLUDES ACTUAL SUSP"),
# ("61", "NON-COMPLETION OF PROBATION"),
# ("62", "DECISION - BOARD DECISION SET ASIDE"),
# ("63", "PRACT TEMP RESTR/SUSP BY ADMIN LAW JUDGE"),
# ("64", "PRACT TEMP RESTR OR SUSP BY COURT JUDGE"),
# ("65", "AUTOMATIC SUSPENSION ORDER"),
# ("66", "Court Order"),
# ("67", "PC23 ORDER"),
# ("68", "SUSP BY ANOTHER STATE OR FED GOVERNMENT"),
# ("70", "LIMITATIONS ON PRACTICE"),
# ("71", "PROBATION COMPLETED"),
# ("76", "MISDEMEANOR CONVICTION"),
# ("77", "FELONY CONVICTION"),
# ("78", "Admin Action by Other State/Fed Gov't"),
# ("79", "MALPRACTICE JUDGMENT"),
# ("80", "HOSPITAL DISCIPLINE PER B&P CDE SECT 805"),
# ("81", "ARBITRATION AWARD"),
# ("82", "MALPRACTICE SETTLEMENTS"),
# ("83", "PROBATIONARY LICENSE"),
# ("9",  "INACTIVE"),
# ("91", "PRIOR PROBATION COMPLETED"))

LICENSE_SPECIALTIES = (
    ("00", "No specialty code"),
    ("01", "Allergy and Immunology"),
    ("02", "Clinical & Laboratory Immunology"),
    ("03", "Clinical Immunology"),
    ("04", "Anesthesiology"),
    ("05", "Anesthesiology Critical Care Medicine"),
    ("06", "Pain Management Medicine"),
    ("07", "Pediatric Anesthesiology"),
    ("08", "Colon and Rectal Surgery"),
    ("09", "Dermatology"),
    ("10", "Clinical & Laboratory Drm Immunology"),
    ("11", "Dermatopathology"),
    ("12", "Emergency Medicine"),
    ("13", "Medical Toxicology-Emergency Medicine"),
    ("14", "Pediatric Emergency Medicine"),
    ("15", "Sports Medicines-Emergency Medicine"),
    ("16", "Undersea Medicine"),
    ("17", "Family Practice"),
    ("18", "Geriatric Medicine-Family Practice"),
    ("19", "Sports Medicine-Family Practice"),
    ("20", "Internal Medicine"),
    ("21", "Adolescent Medicine"),
    ("22", "Cardiac Electrophysiology"),
    ("23", "Cardiovascular Disease/Cardiology"),
    ("24", "Clinical and Laboratory Immunology"),
    ("25", "Endocrinology, Diabetes and Metabolism"),
    ("26", "Gastroenterology"),
    ("27", "Geriatric Medicine-Internal Medicine"),
    ("28", "Hematology"),
    ("29", "Hematology/Oncology"),
    ("30", "Infectious Disease"),
    ("31", "Internal Medicine Critical Medicine"),
    ("32", "Nephrology"),
    ("33", "Pulmonary Diseases"),
    ("34", "Pulmonary Dis. & Critical Care Medicine"),
    ("35", "Rheumatology"),
    ("36", "Sports Medicine-Internal Medicine"),
    ("37", "Internal Medicine/Pediatrics"),
    ("38", "Medical Genetics"),
    ("39", "Clinical Biochemical Genetics"),
    ("40", "Clinical Biochemical/Molecular Genetics"),
    ("41", "Clinical Cytogenetics"),
    ("42", "Clinical Genetics-MD"),
    ("43", "Neurological Surgery"),
    ("44", "Neuro Surgery Critical Care Medicine"),
    ("45", "Neurology"),
    ("46", "Child Neurology"),
    ("47", "Clinical Neurophysiology"),
    ("48", "Nuclear Medicine"),
    ("49", "Nuclear Radiology"),
    ("50", "Obstetrics & Gynecology"),
    ("51", "Critical Care Medicine-OB/GYN"),
    ("52", "Gynecology"),
    ("53", "Gynecology Oncology"),
    ("54", "Maternal and Fetal Medicine"),
    ("55", "Reproductive Endocrinology"),
    ("56", "Ophthalmology"),
    ("57", "Orthopedic Surgery"),
    ("58", "Adult Reconstructive Orthopedics"),
    ("59", "Foot & Ankle Orthopedics"),
    ("60", "Hand Surgery"),
    ("61", "Musculoskeletal Oncology"),
    ("62", "Orthopedic Sports Medicine"),
    ("63", "Orthopedic Surgery of the Spine"),
    ("64", "Orthopedic Trauma"),
    ("65", "Pediatric Orthopedics"),
    ("66", "Otolaryngology"),
    ("67", "Otology/Neurotology"),
    ("68", "Pediatric Otolaryngology"),
    ("69", "Pathology"),
    ("70", "Anatomic & Clinical Pathology"),
    ("71", "Anatomic Pathology"),
    ("72", "Blood Banking/Transfusion Medicine"),
    ("73", "Clinical Pathology"),
    ("74", "Cytopathology"),
    ("75", "Dermatopathology"),
    ("76", "Forensic Pathology"),
    ("77", "Immunopathology"),
    ("78", "Medical Microbiology"),
    ("79", "Neuropathology"),
    ("80", "Pediatric Pathology"),
    ("81", "Other Pathology"),
    ("82", "Pediatrics"),
    ("83", "Adolescent Medicine"),
    ("84", "Neonatal-Perinatal Medicine"),
    ("85", "Pediatric Cardiology"),
    ("86", "Pediatric Critical Care Medicine"),
    ("87", "Pediatric Emergency Medicine"),
    ("88", "Pediatric Endocrinology"),
    ("89", "Pediatric Gastroenterology"),
    ("90", "Pediatric Hematology/Oncology"),
    ("91", "Pediatric Infectious Disease"),
    ("92", "Pediatric Medical Toxicology"),
    ("93", "Pediatric Nephrology"),
    ("94", "Pediatric Pulmonology"),
    ("95", "Pediatric Rheumatology"),
    ("96", "Pediatric Sports Medicine"),
    ("97", "Physical Medicine & Rehabilitation"),
    ("98", "Spinal Cord Injury Medicine"),
    ("99", "Plastic Surgery"),
    ("A0", "Craniofacial Surgery"),
    ("A1", "Hand Surgery"),
    ("A2", "Preventive Medicine"),
    ("A3", "Aerospace Medicine"),
    ("A4", "Medical Toxicology"),
    ("A5", "Occupational Medicine"),
    ("A6", "Public Health & General Preventive Med"),
    ("A7", "Undersea Medicine"),
    ("A8", "Psychiatry"),
    ("A9", "Addiction Psychiatry"),
    ("B1", "Child & Adolescent Psychiatry"),
    ("B2", "Forensic Psychiatry"),
    ("B3", "Geriatric Psychiatry"),
    ("B4", "Psychiatry & Neurology"),
    ("B5", "Radiology"),
    ("B6", "Diagnostic Radiology"),
    ("B7", "Musculoskeletal Radiology"),
    ("B8", "Neuroradiology"),
    ("B9", "Nuclear Radiology"),
    ("C1", "Pediatric Radiology"),
    ("C2", "Radiological Physics"),
    ("C3", "Vascular/Interventional Radiology"),
    ("C4", "Radiation Oncology/Therapeutic Radiology"),
    ("C5", "SurgeryC6General Surgery"),
    ("C7", "Hand Surgery"),
    ("C8", "Pediatric Surgery"),
    ("C9", "Surgical Critical Care"),
    ("D1", "Vascular Surgery"),
    ("D2", "Thoracic Surgery"),
    ("D3", "Urology"),
    ("D4", "Pediatric Urology"),
    ("D5", "Acupuncture Medicine"),
    ("D6", "Other"),
    ("D7", "Specialty not specific"),
    ("D8", "General Practice"),
    ("D9", "Physical Medicine Rehabilitation New Codes"),
    ("E1", "Cardio Thoracic Surgery New Codes"),
    ("E2", "Orthopedics"),
    ("X0", "Allergy"),
    ("X1", "Pain Medicine"),
    ("X2", "Anesthesiology"),
    ("X3", "Surgery Colon & Rectal"),
    ("X4", "Emergency Medicine"),
    ("X5", "Geriatrics"),
    ("X6", "General Practitioner"),
    ("X7", "Immunology"),
    ("X8", "Diabetes"),
    ("X9", "Endocrinology"),
    ("XA", "Ostepathy"),
    ("XB", "Cardiovascular Disease"),
    ("XC", "Neoplastic Diseases"),
    ("XD", "Neoplastic or Oncology"),
    ("XE", "Oncology"),
    ("XF", "Physical Medicine & Rehabilitation"),
    ("XG", "Rehabilitative Medicine"),
    ("XH", "Genetic Medicine"),
    ("XI", "Surgery Head & Neck"),
    ("XJ", "Surgery Neurological"),
    ("XK", "Pediatric Neurology"),
    ("XL", "Gynecology & Obstetrics"),
    ("XM", "Obstetrics"),
    ("XN", "Surgery Ophthalmologic"),
    ("XO", "Orthopedics"),
    ("XP", "Surgery Orthopedic"),
    ("XQ", "Otology"),
    ("XR", "Broncho Esphagology"),
    ("XS", "Laryngology"),
    ("XT", "Otorhinolaryngology ENT"),
    ("XU", "Rhinology"),
    ("XV", "Clinical Pathology"),
    ("XW", "Dermatological Pathology"),
    ("XX", "Microbiology"),
    ("XY", "Neonatologist"),
    ("XZ", "Pediatric Allergy"),
    ("Y0", "Surgery Plastic"),
    ("Y1", "Epidemiology"),
    ("Y2", "Public Health"),
    ("Y3", "General Preventive Medicine"),
    ("Y4", "Nutritional Medicine"),
    ("Y5", "Addiction Medicine"),
    ("Y6", "Child Psychiatry"),
    ("Y7", "Psychoanalysis"),
    ("Y8", "Psychosomatic Medicine"),
    ("Y9", "Radiology Diagnostic"),
    ("YA", "Radiology Nuclear"),
    ("YB", "Radiology Pediatric"),
    ("YC", "Radiology Radioisotopic"),
    ("YD", "Radiology Therapeutic"),
    ("YE", "Surgery Hand"),
    ("YF", "Surgery Pediatric"),
    ("YG", "Surgery Cardiovascular"),
    ("YH", "Surgery General"),
    ("YI", "Surgery Abdominal"),
    ("YJ", "Surgery Gastroenterologic"),
    ("YK", "Surgery Maxillofacial"),
    ("YL", "Surgery Trauma"),
    ("YM", "Surgery Urological"),
    ("YN", "Surgery Thoracic"),
    ("YO", "Blood Banking"),
    ("YP", "Clinical Pharmacology"),
    ("YQ", "Hypnosis"),
    ("YR", "Legal Medicine"),
    ("YS", "Surgery Vascular"),
    ("D8", "General Practice"),
    ("D9", "Physical Medicine Rehabilitation"),
)

LICENSE_CODES = (
    ("1101", "Physician’sAssistant"),
    ("1104", "Physician"),
    ("1105", "Limited Osteopath (Physician)"),
    ("1106", "RespiratoryCare Professional"),
    ("1107", "Provisional Physician"),
    ("1108", "Institutional Physician"),
    ("1109", "Acupuncturist1110 Auricular Detox Specialist"),
    ("1111", "Volunteer in Medicine"),
    ("1112", "Perfusionist"),
    ("1113", "Physician Teacher"),
    ("1114", "Residency Training Permit"),
    ("1115", "Orthotist"),
    ("1116", "Prosthetist"),
    ("1117", "Orthotist& Prosthetist"),
    ("1118", "Pain ManagementClinic"),
    ("1119", "Assistant Cosmetic Laser Practitioner"),
    ("1120", "Senior Cosmetic Laser Practitione"),
)


class LicenseManager(models.Manager):

    def get_or_create(self, prov, **kwargs):

        if not kwargs:
            return
        fieldnames = set(f.name for f in License._meta.get_fields())
        updated = []
        for name, value in kwargs.items():
            if name not in fieldnames:
                raise ValueError(
                    "%s is not a field of %s" % (name, type(self).__name__)
                )
        x, created = super().get_or_create(prov=prov, **kwargs)
        x.save()

        if created == True:

            licensetrack = LicenseTrack.objects.create(prov=prov, license=x)
            licensetrack.save()

        return x, created

        # for key, value in kwargs.items():
        #     if key == 'license_number':
        #         pass

    # def my_fancy_update(self, **kwargs):
    #     if not kwargs:
    #         return

    #     fieldnames = set(f.name for f in self._meta.get_fields())
    #     updated = []
    #     for name, value in kwargs.items():
    #         if name not in fieldnames:
    #             raise ValueError("%s is not a field of %s" % (name, type(self).__name__))
    #         setattr(self, name, value)
    #         updated.append(name)
    #     self.save(update_fields=updated)


class License(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    license_code = models.CharField(
        max_length=128, choices=LICENSE_CODES, default="1104"
    )
    shortdescription = models.TextField(null=True, blank=True)  # licenseprofile
    originalissuedate = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # licenseprofile
    expirationdate = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # licenseprofile
    graduationdate = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # licenseprofile
    licenseid = models.CharField(null=True, blank=True, max_length=7)  # licenseprofile
    licensetype = models.CharField(
        null=True, blank=True, max_length=1
    )  # licenseprofile
    licensenumber = models.CharField(
        null=True, blank=True, max_length=6
    )  # licenseprofile
    primary_status = models.CharField(
        null=True, blank=True, max_length=2
    )  # licenseprofile
    schoolcode = models.CharField(null=True, blank=True, max_length=6)  # licenseprofile
    has_action = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_courtorder = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_reprimand = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_malpractice = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_felony = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_misdemeanor = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_suspension = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_citation = models.IntegerField(default=0, blank=True)  # licenseprofile
    has_probation = models.IntegerField(default=0, blank=True)  # licenseprofile
    completed_probation = models.IntegerField(default=0, blank=True)  # licenseprofile
    no_practice_permitted = models.IntegerField(default=0, blank=True)  # licenseprofile

    objects = LicenseManager()

    def __str__(self):
        return f"{self.prov}\n{self.licensetype} {self.licensenumber} {self.primary_status}"


class LicenseTrack(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    license = models.ForeignKey(License, on_delete=models.CASCADE)
    # secondary_status = models.CharField(max_length=90, choices=LICENSE_STATUS_2)
    received_date = models.DateTimeField(auto_now=True)


class ValidIn(models.Model):

    license = models.ForeignKey(License, on_delete=models.CASCADE)
    valid = models.BooleanField(default=False)
    state = models.CharField(max_length=30, choices=STATES)


# class Actions(models.Model):
#     prov = models.ForeignKey(Provider, on_delete=models.CASCADE) #actions
#     effective_date = models.DateTimeField(auto_now=False, null=True, blank=True) #actions
#     summary = models.TextField(null=True, blank=True) #actions
#     col_value = models.TextField(null=True, blank=True) #actions
#     col = models.TextField(null=True, blank=True) #actions


class Actions(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # actions
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # actions
    summary = models.TextField(null=True, blank=True)  # actions
    authority = models.TextField(null=True, blank=True)  # actions
    action = models.TextField(null=True, blank=True)  # actions


class Probations(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # probations
    summary = models.TextField(null=True, blank=True)  # probations
    casenumber = models.TextField(null=True, blank=True)  # probations
    age_of_probation = models.TextField(null=True, blank=True)  # probations
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # probations
    end_date = models.DateTimeField(auto_now=False, null=True, blank=True)  # probations
    pstatus = models.CharField(null=True, blank=True, max_length=2)  # probations
    status = models.TextField(null=True, blank=True)  # probations

    def __str__(self):
        return "{} {} {} {}".format(
            self.prov.__str__(), self.effective_date, self.end_date, self.status
        )
        # return f"{self.provider.__str__()} : {self.prov_desc.__str__()}"


class Convictions(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # convictions
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # convictions
    summary = models.TextField(null=True, blank=True)  # convictions
    sentence = models.TextField(null=True, blank=True)  # convictions
    court = models.TextField(null=True, blank=True)  # convictions
    classs = models.TextField(null=True, blank=True)  # convictions


class Accusations(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # accusations
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # accusations
    casenumber = models.TextField(null=True, blank=True)  # accusations
    description = models.TextField(null=True, blank=True)  # accusations


class Malpractices(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # malpractices
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # malpractices
    amount = models.IntegerField(default=0, null=True, blank=True)  # malpractices
    authority = models.TextField(null=True, blank=True)  # malpractices
    docket = models.TextField(null=True, blank=True)  # malpractices
    # status = models.CharField(null=True, blank=True, max_length= 7) #malpractices
    # classs = models.TextField(null=True, blank=True) #malpractices


class Arbitrations(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # arbitrationawards
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # arbitrationawards
    amount = models.IntegerField(default=0, null=True, blank=True)  # arbitrationawards
    authority = models.TextField(null=True, blank=True)
    docket = models.TextField(null=True, blank=True)
    # status = models.CharField(null=True, blank=True, max_length= 7) #arbitrationawards


class Citations(models.Model):
    prov = models.ForeignKey(
        Provider, on_delete=models.CASCADE
    )  # administrativecitationissued_v
    dateresolved = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # administrativecitationissued_v
    datecitationissued = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # administrativecitationissued_v
    resolved = models.CharField(
        null=True, blank=True, max_length=1
    )  # administrativecitationissued_v
    cause = models.TextField(null=True, blank=True)  # administrativecitationissued_v
    amount = models.IntegerField(default=0, null=True, blank=True)


class Otherstate(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # Otherstate
    effective_date = models.DateTimeField(
        auto_now=False, null=True, blank=True
    )  # Otherstate
    jurisdiction = models.TextField(null=True, blank=True)  # Otherstate
    description = models.TextField(null=True, blank=True)  # Otherstate


class Number_negatives_v(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # number_negatives_v
    col = models.TextField(null=True, blank=True)  # number_negatives_v
    cnt = models.IntegerField(default=0, null=True, blank=True)  # number_negatives_v


class Number_of_negatives(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)  # number_of_negatives
    sum = models.IntegerField(default=0, null=True, blank=True)  # number_of_negatives

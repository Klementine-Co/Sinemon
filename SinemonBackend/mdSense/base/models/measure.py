from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.baseuser import deferred


MEASURE_CATEGORIES = (
    (
        "Physical Therapist in Private Practice",
        "Physical Therapist in Private Practice",
    ),
    (
        "Comprehensive Outpatient Rehabilitation Facility",
        "Comprehensive Outpatient Rehabilitation Facility",
    ),
    ("Hospital-Psychiatric (PPS excluded)", "Hospital-Psychiatric (PPS excluded)"),
    (
        "Physician/Critical Care (Intensivists)",
        "Physician/Critical Care (Intensivists)",
    ),
    ("Physician/Neurosurgery", "Physician/Neurosurgery"),
    ("Hospital-Rehabilitation Unit", "Hospital-Rehabilitation Unit"),
    ("Certified Clinical Nurse Specialist", "Certified Clinical Nurse Specialist"),
    ("Individual Certified Prosthetist", "Individual Certified Prosthetist"),
    ("Physician/Rheumatology", "Physician/Rheumatology"),
    ("Physician/Maxillofacial Surgery", "Physician/Maxillofacial Surgery"),
    (
        "Medical Supply Company with Respiratory Therapist",
        "Medical Supply Company with Respiratory Therapist",
    ),
    ("Physician/Orthopedic Surgery", "Physician/Orthopedic Surgery"),
    ("Physician/Hematology-Oncology", "Physician/Hematology-Oncology"),
    (
        "Medical Supply Company with Orthotist-Prosthetist",
        "Medical Supply Company with Orthotist-Prosthetist",
    ),
    ("Radiation Therapy Center", "Radiation Therapy Center"),
    ("Physician/Pathology", "Physician/Pathology"),
    ("Physician/Pain Management", "Physician/Pain Management"),
    ("Community Mental Health Center", "Community Mental Health Center"),
    (
        "Physician/Cardiovascular Disease (Cardiology)",
        "Physician/Cardiovascular Disease (Cardiology)",
    ),
    ("All Other Suppliers", "All Other Suppliers"),
    (
        "Independent Diagnostic Testing Facility (IDTF)",
        "Independent Diagnostic Testing Facility (IDTF)",
    ),
    ("Micrographic Dermatologic Surgery", "Micrographic Dermatologic Surgery"),
    ("Ambulance Service Provider", "Ambulance Service Provider"),
    ("Home Infusion Therapy Services", "Home Infusion Therapy Services"),
    ("Clinical Laboratory", "Clinical Laboratory"),
    ("Physician/Interventional Cardiology", "Physician/Interventional Cardiology"),
    ("Oxygen supplier", "Oxygen supplier"),
    ("Physician/Emergency Medicine", "Physician/Emergency Medicine"),
    ("Mass Immunizer Roster Biller[2]", "Mass Immunizer Roster Biller[2]"),
    ("Slide Preparation Facility", "Slide Preparation Facility"),
    ("Physician/Pulmonary Disease", "Physician/Pulmonary Disease"),
    (
        "Medical Supply Company with Pharmacist",
        "Medical Supply Company with Pharmacist",
    ),
    ("Physician/Medical Toxicology", "Physician/Medical Toxicology"),
    ("Organ Procurement Organization", "Organ Procurement Organization"),
    (
        "Physician/Interventional Pain Management",
        "Physician/Interventional Pain Management",
    ),
    ("Physician/Diagnostic Radiology", "Physician/Diagnostic Radiology"),
    (
        "Individual Certified Prosthetist-Orthotist",
        "Individual Certified Prosthetist-Orthotist",
    ),
    ("Psychologist Clinical", "Psychologist Clinical"),
    ("Department Store", "Department Store"),
    ("Physician/Radiation Oncology", "Physician/Radiation Oncology"),
    ("Physician Assistant", "Physician Assistant"),
    ("Pedorthic personnel", "Pedorthic personnel"),
    ("Pharmacy", "Pharmacy"),
    ("Physician/Vascular Surgery", "Physician/Vascular Surgery"),
    ("Medical Supply Company with Orthotist", "Medical Supply Company with Orthotist"),
    ("Physician/Infectious Disease", "Physician/Infectious Disease"),
    ("Physician/Obstetrics and Gynecology", "Physician/Obstetrics and Gynecology"),
    ("Physician/Sports Medicine", "Physician/Sports Medicine"),
    ("Opioid Treatment Program", "Opioid Treatment Program"),
    ("Oral Surgery (Dentist only)", "Oral Surgery (Dentist only)"),
    ("Physician/Otolaryngology", "Physician/Otolaryngology"),
    ("Ocularist", "Ocularist"),
    ("Certified Nurse Midwife", "Certified Nurse Midwife"),
    ("Hospital Units", "Hospital Units"),
    ("Physician/Gastroenterology", "Physician/Gastroenterology"),
    ("Hospice", "Hospice"),
    ("Anesthesiology Assistant", "Anesthesiology Assistant"),
    ("Ambulatory Surgical Center", "Ambulatory Surgical Center"),
    ("Clinical Cardiac Electrophysiology", "Clinical Cardiac Electrophysiology"),
    ("Home Health Agency", "Home Health Agency"),
    ("Physician/Family Practice", "Physician/Family Practice"),
    ("Speech Language Pathologist", "Speech Language Pathologist"),
    (
        "Unknown Supplier/Provider Specialty[4]",
        "Unknown Supplier/Provider Specialty[4]",
    ),
    ("Intensive Cardiac Rehabilitation", "Intensive Cardiac Rehabilitation"),
    ("Physician/Geriatric Medicine", "Physician/Geriatric Medicine"),
    ("Clinic or Group Practice", "Clinic or Group Practice"),
    (
        "Physician/Plastic and Reconstructive Surgery",
        "Physician/Plastic and Reconstructive Surgery",
    ),
    ("Skilled Nursing Facility", "Skilled Nursing Facility"),
    ("Physician/Nephrology", "Physician/Nephrology"),
    ("Optometry", "Optometry"),
    ("Hospital-Long-Term (PPS excluded)", "Hospital-Long-Term (PPS excluded)"),
    (
        "Registered Dietitian or Nutrition Professional",
        "Registered Dietitian or Nutrition Professional",
    ),
    ("Physician/Neurology", "Physician/Neurology"),
    ("Physician/General Surgery", "Physician/General Surgery"),
    ("Physician/Endocrinology", "Physician/Endocrinology"),
    ("Portable X-Ray Supplier", "Portable X-Ray Supplier"),
    ("Hospital-Psychiatric Unit", "Hospital-Psychiatric Unit"),
    ("Physician/Dermatology", "Physician/Dermatology"),
    ("Physician/Allergy/ Immunology", "Physician/Allergy/ Immunology"),
    ("Physician/Psychiatry", "Physician/Psychiatry"),
    ("Physician/Pediatric Medicine", "Physician/Pediatric Medicine"),
    (
        "Voluntary Health or Charitable Agency[1]",
        "Voluntary Health or Charitable Agency[1]",
    ),
    ("Licensed Clinical Social Worker", "Licensed Clinical Social Worker"),
    ("Physician/Internal Medicine", "Physician/Internal Medicine"),
    (
        "Hematopoietic Cell Transplantation and Cellular Therapy",
        "Hematopoietic Cell Transplantation and Cellular Therapy",
    ),
    ("End-Stage Renal Disease Facility", "End-Stage Renal Disease Facility"),
    ("Public Health or Welfare Agency", "Public Health or Welfare Agency"),
    ("Physician/General Practice", "Physician/General Practice"),
    ("Individual Certified Orthotist", "Individual Certified Orthotist"),
    ("Grocery Store", "Grocery Store"),
    ("Adult Congenital Heart Disease", "Adult Congenital Heart Disease"),
    ("Podiatry", "Podiatry"),
    ("Chiropractic", "Chiropractic"),
    ("Indian Health Service facility[13]", "Indian Health Service facility[13]"),
    ("Other Nursing Facility", "Other Nursing Facility"),
    ("Mammography Center", "Mammography Center"),
    ("Physician/Neuropsychiatry", "Physician/Neuropsychiatry"),
    (
        "Physician/Physical Medicine and Rehabilitation",
        "Physician/Physical Medicine and Rehabilitation",
    ),
    (
        "Medical Supply Company with Prosthetist",
        "Medical Supply Company with Prosthetist",
    ),
    ("Physician/Urology", "Physician/Urology"),
    ("Physician/Anesthesiology", "Physician/Anesthesiology"),
    ("Federally Qualified Health Center", "Federally Qualified Health Center"),
    (
        "Occupational Therapist in Private Practice",
        "Occupational Therapist in Private Practice",
    ),
    ("Other Medical Supply Company", "Other Medical Supply Company"),
    ("Physician/Surgical Oncology", "Physician/Surgical Oncology"),
    ("Hospitals", "Hospitals"),
    ("Physician/Hematology", "Physician/Hematology"),
    ("Physician/Thoracic Surgery", "Physician/Thoracic Surgery"),
    ("Physician/Sleep Medicine", "Physician/Sleep Medicine"),
    ("Rehabilitation Agency", "Rehabilitation Agency"),
    ("Undersea and Hyperbaric Medicine", "Undersea and Hyperbaric Medicine"),
    ("Hospital-Childrenâ€™s (PPS excluded)", "Hospital-Childrenâ€™s (PPS excluded)"),
    ("Physician/Nuclear Medicine", "Physician/Nuclear Medicine"),
    (
        "Medical supply company with pedorthic personnel",
        "Medical supply company with pedorthic personnel",
    ),
    ("Histocompatibility Laboratory", "Histocompatibility Laboratory"),
    ("Dentist", "Dentist"),
    ("Audiologist", "Audiologist"),
    ("Rural Health Clinic", "Rural Health Clinic"),
    ("Medicare Diabetes Preventive Program", "Medicare Diabetes Preventive Program"),
    ("Physician/Gynecological Oncology", "Physician/Gynecological Oncology"),
    ("Physician/Peripheral Vascular Disease", "Physician/Peripheral Vascular Disease"),
    (
        "Physician/Colorectal Surgery (Proctology)",
        "Physician/Colorectal Surgery (Proctology)",
    ),
    ("Physician/Geriatric Psychiatry", "Physician/Geriatric Psychiatry"),
    ("Physician/Hand Surgery", "Physician/Hand Surgery"),
    (
        "Certified Registered Nurse Anesthetist (CRNA)",
        "Certified Registered Nurse Anesthetist (CRNA)",
    ),
    ("Physician/Ophthalmology", "Physician/Ophthalmology"),
    (
        "Physician/Osteopathic Manipulative Medicine",
        "Physician/Osteopathic Manipulative Medicine",
    ),
    ("Physician/Interventional Radiology", "Physician/Interventional Radiology"),
    ("Physician/Undefined Physician type[6]", "Physician/Undefined Physician type[6]"),
    ("Advance Diagnostic Imaging", "Advance Diagnostic Imaging"),
    ("Physician/Preventive Medicine", "Physician/Preventive Medicine"),
    ("Medical Genetics and Genomics", "Medical Genetics and Genomics"),
    ("Hospital-General", "Hospital-General"),
    (
        "Hospital-Specialty Hospital (cardiac orthopedic surgical)",
        "Hospital-Specialty Hospital (cardiac orthopedic surgical)",
    ),
    ("Physician/Cardiac Surgery", "Physician/Cardiac Surgery"),
    ("Hospital-Swing Bed Approved", "Hospital-Swing Bed Approved"),
    ("Optician", "Optician"),
    ("Physician/Medical Oncology", "Physician/Medical Oncology"),
    (
        "Physician/Advanced Heart Failure and Transplant Cardiology",
        "Physician/Advanced Heart Failure and Transplant Cardiology",
    ),
    (
        "Hospital-Rehabilitation (PPS excluded)",
        "Hospital-Rehabilitation (PPS excluded)",
    ),
    ("Physician/Hospice and Palliative Care", "Physician/Hospice and Palliative Care"),
    ("Physician/Hospitalist", "Physician/Hospitalist"),
    ("Intermediate Care Nursing Facility", "Intermediate Care Nursing Facility"),
    ("Nurse Practitioner", "Nurse Practitioner"),
    (
        "Religious Non-Medical Health Care Institution",
        "Religious Non-Medical Health Care Institution",
    ),
    ("Critical Access Hospital", "Critical Access Hospital"),
    ("Physician/Addiction Medicine", "Physician/Addiction Medicine"),
    ("Visitor", "Visitor"),
    ("General", "General"),
)


class Measure(models.Model):

    measure = models.CharField(max_length=75)
    measure_cat = models.CharField(choices=MEASURE_CATEGORIES, max_length=600)
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )

    def __str__(self):
        return f"{self.measure} - {self.measure_cat}"


class Measures(models.Model):

    measure = models.ForeignKey(Measure, on_delete=models.CASCADE)
    assignee = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="assignee"
    )
    value = models.IntegerField(default=0)
    rating = models.CharField(null=True, blank=True, max_length=9)

    def __str__(self):
        return f"{self.measure.__str__()} : {self.value}"


class MeasuresManager(models.Manager):

    def get_or_create(self, measure, assigned, assignor, value):

        measures, created = Measures.objects.get_or_create(
            measure=measure, assignee=assigned
        )

        x, created = super().get_or_create(
            measure=measure, assignee=assigned, assignor=assignor
        )

        if created == True:
            measures.value += value
            measures.save()
            x.value = value
            x.save()

        else:
            measures.value -= x.value
            measures.value += value
            measures.save()
            x.value = value
            x.save()

        return x, created


class MeasuresTrack(models.Model):

    measure = models.ForeignKey(Measure, on_delete=models.CASCADE)
    assigned_date = models.DateTimeField(auto_now=True)
    assignee = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="assignees"
    )
    assignor = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="assignors"
    )
    value = models.IntegerField(default=0)

    objects = MeasuresManager()

    def __str__(self):
        return f"{self.measure.__str__()} : {self.value}"

from os import environ as env
import django
import sys

sys.path.append("path/to/project/")
env["DJANGO_SETTINGS_MODULE"] = "mdSense.settings"
env["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()
from base.models.MEDCODES import *
from base.models.user import *
import pandas as pd


dxcs = pd.read_excel("../../../database/DXS.xlsx")
hcpcs = pd.read_excel("../../../database/PROCS.xlsx")
mxcs = pd.read_excel("../../../database/modifier_codes.xlsx")
poscs = pd.read_excel("../../../database/place_of_service_codes.xlsx")


admin = User_Custom.objects.filter(id=1)[0]

mxcs_records = mxcs.to_dict("records")

model_instances = [
    Mcodes(
        code=record["HCPCS Modifiers"],
        desc=record["Modifiers Description"],
        cat_desc=record["cat_desc"],
        created_by=admin,
    )
    for record in mxcs_records
]

Mcodes.objects.bulk_create(model_instances)

poscs_records = poscs.to_dict("records")

model_instances = [
    POScodes(
        code=record["Place of Service Code(s)"],
        desc=record["Place of Service Name"],
        cat_desc=record["Place of Service Description"],
        created_by=admin,
    )
    for record in poscs_records
]

POScodes.objects.bulk_create(model_instances)


dxcs_records = dxcs.to_dict("records")

model_instances = [
    Dcodes(
        code=record["CODE"],
        desc=record["DESCRIPTION"],
        cat_code=record["CATEGORY"],
        cat=record["CATEGORY DESCRIPTION"],
        cat_desc=record["cat"],
        created_by=admin,
    )
    for record in dxcs_records
]

Dcodes.objects.bulk_create(model_instances)


hcpcs_records = hcpcs.to_dict("records")

model_instances = [
    Pcodes(
        code=record["HCPCS"],
        desc=record["Desc"],
        cat=record["cat"],
        cat_desc=record["cat_desc"],
        created_by=admin,
    )
    for record in hcpcs_records
]

Pcodes.objects.bulk_create(model_instances)

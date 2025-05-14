from base.models.license import *
from django.views.generic import View
from collections import namedtuple
from base.models.user import User_Custom
from base.models.badge import Badge, Badges
from base.models.provider import Provider
from django.shortcuts import render

import pycountry


def namedtuplefetchall(cursor):
    "Return all rows from a cursor as a namedtuple"
    desc = cursor.description
    nt_result = namedtuple("Result", [col[0] for col in desc])
    return [nt_result(*row) for row in cursor.fetchall()]


def checkNull(x):

    if isinstance(x, str):
        return x.capitalize() if x is not None else "NA"
    else:
        return x if x is not None else "NA"


class LoadFromDBProvider(View):

    def get(self, *args, **kwargs):

        # from base.models.user import User_Custom
        # Userr  = User_Custom

        # users = Userr.objects.filter(is_superuser=True)
        # print(users)
        # user = Userr.objects.get(email='admin@admin.com')
        # print(user)
        # user.set_password('123 Admin.')
        # user.save()

        # x = Provider.objects.select_related('provider__user')
        # print(x)

        # from faker import Faker
        # fk = Faker()
        # fk.random.seed(4321)
        import random

        from django.db import connection

        raw_query = """select * from medbaseca.licenseprofile where licenseid in
(SELECT licenseid
    FROM 
        (
SELECT licenseid,
         ROW_NUMBER() OVER( PARTITION BY licenseid ) AS row_num 
from(
select * from non_negatives_view
union
select * from negatives_view

) a ) t
group by t.licenseid	
having count( t.row_num) = 1
)
order by 1"""
        cursor = connection.cursor()
        cursor.execute(raw_query)
        y = cursor.fetchall()
        # desc = cursor.
        # nt_result = namedtuple('Result', [col[0] for col in desc])
        # print([desc[0] for desc in cursor.description])

        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        # print(colkeys['FirstName'])
        shortdescription = colkeys["shortdescription"]
        originalissuedate = colkeys["originalissuedate"]
        expirationdate = colkeys["expirationdate"]
        graduationdate = colkeys["graduationdate"]
        licenseid = colkeys["licenseid"]
        licensetype = colkeys["licensetype"]
        licensenumber = colkeys["licensenumber"]
        primary_status = colkeys["primarystatuscode"]
        schoolcode = colkeys["schoolcode"]
        has_action = colkeys["has_action"]
        has_courtorder = colkeys["has_courtorder"]
        has_reprimand = colkeys["has_reprimand"]
        has_malpractice = colkeys["has_malpractice"]
        has_felony = colkeys["has_felony"]
        has_misdemeanor = colkeys["has_misdemeanor"]
        has_suspension = colkeys["has_suspension"]
        has_citation = colkeys["has_citation"]
        has_probation = colkeys["has_probation"]
        completed_probation = colkeys["completed_probation"]
        no_practice_permitted = colkeys["no_practice_permitted"]

        lastname = colkeys["lastname"]
        firstname = colkeys["firstname"]
        middlename = colkeys["middlename"]
        namesuffix = colkeys["namesuffix"]
        previouslastname = colkeys["previouslastname"]
        sex = colkeys["sex"]
        addr1 = colkeys["addressofrecordline1"]
        addr2 = colkeys["addressofrecordline2"]
        addr3 = colkeys["addressofrecordline3"]
        city = colkeys["addressofrecordcity"]
        countycode = colkeys["addressofrecordcountycode"]
        state = colkeys["addressofrecordstate"]
        country = colkeys["addressofrecordcountry"]
        zipcode = colkeys["addressofrecordzipcode"]

        for i in range(2500):
            x = y[i - 1]
            # print(checkNull(x[countycode]))

            print(x[city])

        #     email = checkNull(x[lastname]) + '.' + checkNull(x[firstname]) + '.' + checkNull(x[middlename]) + '@provider.com'

        #     provider = User_Custom.objects.create_provider(email=checkNull(email), username=checkNull(email), first_name=checkNull(x[firstname]), last_name=checkNull(x[lastname]), previous_last_name=checkNull(x[previouslastname]), middle_name=checkNull(x[middlename]), sex=checkNull(x[sex]) if checkNull(x[sex]) != 'NA' else 'E', namesuffix=checkNull(x[namesuffix]), street_address=checkNull(x[addr1]), street_address2=checkNull(x[addr2]), street_address3=checkNull(x[addr3]), city=checkNull(x[city]), county_code=checkNull(int(x[countycode] if x[countycode] else 0)), zipcode=checkNull(x[zipcode]), state=checkNull(x[state]),country=pycountry.countries.get(name=x[country]).alpha_2 if checkNull(x[country]) != 'NA' else 'US' , password='1234')

        #     # print(provider)

        #     # print(checkNull(x[expirationdate]))
        #     # print(x[expirationdate])

        #     License.objects.get_or_create(prov=provider,
        #     shortdescription = checkNull(x[shortdescription]), originalissuedate = checkNull(x[originalissuedate]), expirationdate = x[expirationdate], graduationdate = checkNull(x[graduationdate]), licenseid = checkNull(x[licenseid]), licensetype = checkNull(x[licensetype]), licensenumber = checkNull(x[licensenumber]), primary_status = checkNull(x[primary_status]), schoolcode = checkNull(x[schoolcode]), has_action = checkNull(x[has_action]), has_courtorder = checkNull(x[has_courtorder]), has_reprimand = checkNull(x[has_reprimand]), has_malpractice = checkNull(x[has_malpractice]), has_felony = checkNull(x[has_felony]), has_misdemeanor = checkNull(x[has_misdemeanor]), has_suspension = checkNull(x[has_suspension]), has_citation = checkNull(x[has_citation]), has_probation = checkNull(x[has_probation]), completed_probation = checkNull(x[completed_probation]), no_practice_permitted = checkNull(x[no_practice_permitted]) )

        # # for i in range(10):
        # #     User_Custom.objects.create_member(firstname=fk.first_name(), lastname=fk.last_name(), middlename=fk.first_name(), email=fk.email(), username=fk.user_name(),password='1234', address=fk.street_address(), city=fk.city(), county_code=fk.country_code(), state='CA', country=fk.country(), zipcode=fk.postcode())
        #     # print(cursor.fetchrow())
        # # timedelta()

        # for i in range(2500):

        #    provider = Provider.objects.get(provider=Provider.objects.all()[i])
        #    provider.badge = Badge.objects.all()[random.randrange(1, 4, 1)-1]
        #    provider.save()
        #    if provider.badge is None:
        #        print(provider)

        return render(self.request, "home.html")


class LoadFromDBLicenseInfo(View):

    def get(self, *args, **kwargs):

        import random

        from django.db import connection

        # actions_query = "select * from medbaseca.actions limit 2500"
        # probations_query = "select licenseid , summary, casenumber , age_of_probation || '' as age_of_probation , effective_date , end_date, status from medbaseca.probations limit 2500"
        # convictions_query = "select * from medbaseca.convictions limit 2500"
        # accusations_query = "select * from medbaseca.accusations limit 2500"
        # malpractices_query = "select * from medbaseca.malpractices limit 2500"
        # arbitrations_query = "select * from medbaseca.arbitrationawards     limit 2500"
        # citations_query = "select * from medbaseca.administrativecitationissued_v limit 2500"
        # number_negatives_v_query = "select * from medbaseca.number_negatives_v limit 2500"
        # number_of_negatives_query = "select * from medbaseca.number_of_negatives limit 2500"

        actions_query = "select * from medbaseca.actions natural join (select licenseid::integer from public.base_license) a"
        probations_query = "select * from medbaseca.probations natural join (select licenseid::integer from public.base_license) a"
        convictions_query = "select * from medbaseca.convictions natural join (select licenseid::integer from public.base_license) a"
        accusations_query = "select * from medbaseca.accusations natural join (select licenseid::integer from public.base_license) a"
        malpractices_query = "select * from medbaseca.payouts natural join (select licenseid::integer from public.base_license) a where type = 'malpractice'"
        arbitrations_query = "select * from medbaseca.payouts natural join (select licenseid::integer from public.base_license) a where type = 'arbitration'"
        citations_query = "select * from medbaseca.citation natural join (select licenseid::integer from public.base_license) a"
        number_of_negatives_query = "select * from medbaseca.number_of_negatives natural join (select licenseid::integer from public.base_license) a"
        otherstate_query = "select * from medbaseca.otherstate natural join (select licenseid::integer from public.base_license) a"
        cursor = connection.cursor()
        # comment here
        cursor.execute(actions_query)
        actions = cursor.fetchall()
        colkeys = {}
        # print(actions)
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        effective_date = colkeys["dateofaction"]
        summary = colkeys["description"]
        action = colkeys["action"]
        authority = colkeys["authority"]

        # print(cursor.rowcount)
        for i in range(cursor.rowcount):
            # print('debug 1')
            x = actions[i - 1]
            try:

                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
                print(prov)
                print("debug")

            except License.DoesNotExist:
                prov = None
                print("License DNE")

            if prov is not None:
                Actions.objects.get_or_create(
                    prov=prov,
                    effective_date=x[effective_date],
                    summary=x[summary],
                    action=x[action],
                    authority=x[authority],
                )

        cursor.execute(probations_query)
        probations = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        summary = colkeys["probationsummary"]
        casenumber = colkeys["casenumber"]
        age_of_probation = colkeys["age_of_probation"]
        effective_date = colkeys["effectivedate"]
        end_date = colkeys["enddate"]
        status = colkeys["status"]
        pstatus = colkeys["pstatus"]

        for i in range(cursor.rowcount):
            x = probations[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Probations.objects.get_or_create(
                    prov=prov,
                    casenumber=x[casenumber],
                    effective_date=x[effective_date],
                    end_date=x[end_date],
                    summary=str(x[summary]),
                    status=x[status],
                    pstatus=x[pstatus],
                    age_of_probation=str(x[age_of_probation]),
                )

        cursor.execute(convictions_query)
        convictions = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        effective_date = colkeys["effectivedate"]
        summary = colkeys["descriptionofaction"]
        sentence = colkeys["sentence"]
        court = colkeys["court"]
        classs = colkeys["class"]

        for i in range(cursor.rowcount):
            x = convictions[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Convictions.objects.get_or_create(
                    prov=prov,
                    court=x[court],
                    effective_date=x[effective_date],
                    sentence=x[sentence],
                    summary=x[summary],
                    classs=x[classs],
                )

        cursor.execute(accusations_query)
        accusations = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        effective_date = colkeys["effectivedate"]
        licenseid = colkeys["licenseid"]
        casenumber = colkeys["casenumber"]
        description = colkeys["description"]

        for i in range(cursor.rowcount):
            x = accusations[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Accusations.objects.get_or_create(
                    prov=prov,
                    effective_date=x[effective_date],
                    casenumber=x[casenumber],
                    description=x[description],
                )

        cursor.execute(malpractices_query)
        malpractices = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        effective_date = colkeys["dateofaction"]
        amount = colkeys["amount"]
        authority = colkeys["authority"]
        docket = colkeys["docket"]

        for i in range(cursor.rowcount):
            x = malpractices[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Malpractices.objects.get_or_create(
                    prov=prov,
                    effective_date=x[effective_date],
                    amount=x[amount],
                    authority=x[authority],
                    docket=x[docket],
                )

        cursor.execute(arbitrations_query)
        arbitrations = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        effective_date = colkeys["dateofaction"]
        amount = colkeys["amount"]
        authority = colkeys["authority"]
        docket = colkeys["docket"]

        for i in range(cursor.rowcount):
            x = arbitrations[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Arbitrations.objects.get_or_create(
                    prov=prov,
                    effective_date=x[effective_date],
                    amount=x[amount],
                    authority=x[authority],
                    docket=x[docket],
                )

        cursor.execute(citations_query)
        citations = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        dateresolved = colkeys["dateresolved"]
        datecitationissued = colkeys["datecitationissued"]
        resolved = colkeys["resolved"]
        amount = colkeys["fineamount"]
        cause = colkeys["cause"]

        for i in range(cursor.rowcount):
            x = citations[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Citations.objects.get_or_create(
                    prov=prov,
                    datecitationissued=x[datecitationissued],
                    dateresolved=x[dateresolved],
                    amount=x[amount],
                    resolved=x[resolved],
                    cause=x[cause],
                )

        cursor.execute(otherstate_query)
        otherstate = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        jurisdiction = colkeys["jurisdiction"]
        effective_date = colkeys["dateofaction"]
        description = colkeys["description"]

        for i in range(cursor.rowcount):
            x = otherstate[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Otherstate.objects.get_or_create(
                    prov=prov,
                    effective_date=x[effective_date],
                    jurisdiction=x[jurisdiction],
                    description=x[description],
                )

        cursor.execute(number_of_negatives_query)
        number_of_negatives = cursor.fetchall()
        colkeys = {}
        for ind, desc in enumerate(cursor.description):
            # print(desc[0])
            # print(x[0][ind])
            colkeys.update({desc[0]: ind})

        licenseid = colkeys["licenseid"]
        summ = colkeys["count"]

        for i in range(cursor.rowcount):
            x = number_of_negatives[i - 1]
            try:
                prov = License.objects.get(licenseid=str(int(x[licenseid]))).prov
            except License.DoesNotExist:
                prov = None

            if prov is not None:
                Number_of_negatives.objects.get_or_create(prov=prov, sum=x[summ])

        # cursor.execute(number_negatives_v_query)
        # number_negatives_v = cursor.fetchall()
        # colkeys = {}
        # for ind, desc in enumerate(cursor.description):
        #     # print(desc[0])
        #     # print(x[0][ind])
        #     colkeys.update({desc[0]: ind})

        # col = colkeys["col"]
        # licenseid = colkeys["licenseid"]
        # cnt = colkeys["cnt"]

        # for i in range(cursor.rowcount):
        #     x = number_negatives_v[i-1]
        #     try:
        #         prov = License.objects.get(licenseid=x[licenseid]).prov
        #     except License.DoesNotExist:
        #         prov = None

        #     if prov is not None:
        #         Number_negatives_v.objects.get_or_create(prov=prov, cnt = x[cnt], col =  x[col])

        provs = Provider.objects.all()
        for i in range(len(provs)):

            provider = Provider.objects.get(provider=provs[i])
            # print(provider)
            # print(Badge.objects.all()[random.randrange(1, 4, 1)-1])
            provider.badge = Badge.objects.all()[random.randrange(1, 4, 1) - 1]
            provider.save()
            print(provider.badge, provider.provider_id)
            if provider.badge is None:
                print(provider)
        # comment here
        from faker import Faker

        fk = Faker()
        fk.random.seed(4321)
        import random

        for i in range(10):
            User_Custom.objects.create_member(
                firstname=fk.first_name(),
                lastname=fk.last_name(),
                middlename=fk.first_name(),
                email=fk.email(),
                username=fk.user_name(),
                password="1234",
                address=fk.street_address(),
                city=fk.city(),
                county_code=fk.country_code(),
                state="CA",
                country=fk.country_code(),
                zipcode=fk.postcode(),
            )

        return render(self.request, "home.html")

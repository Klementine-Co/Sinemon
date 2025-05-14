from django.views.generic import View
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render


class HomeView(View):

    # def get(self, request, format=None):

    #     # Create a field variable for all Board objects that count the number of topics for each board
    #     student = Provider.objects.all()[0]
    #     serializer = ProvidersSerializer(student)

    #     print(serializer.data)

    #     # return render(request, 'home.html', serializer.data)
    #     return Response(serializer.data, template_name='home.html')
    # def namedtuplefetchall(self, cursor):

    #     "Return all rows from a cursor as a namedtuple"
    #     desc = cursor.description
    #     nt_result = namedtuple('Result', [col[0] for col in desc])
    #     return [nt_result(*row) for row in cursor.fetchall()]

    def get(self, *args, **kwargs):
        print(self.request.user)

        # from base.models.user import User_Custom
        # Userr  = User_Custom

        # users = Userr.objects.filter(email=self.request.user)[0]
        # print(users.is_member)
        # print(users.is_provider)
        # user = Userr.objects.get(email='admin@admin.com')
        # print(user)
        # user.set_password('123 Admin.')
        # user.save()

        # x = Provider.objects.select_related('provider__user')
        # print(x)

        # from faker import Faker
        # fk = Faker()
        # fk.random.seed(4321)

        # from django.db import connection
        # raw_query = "select * from license_profile order by random() limit 1000"
        # cursor = connection.cursor()
        # cursor.execute(raw_query)
        # y = cursor.fetchall()
        # # desc = cursor.
        # # nt_result = namedtuple('Result', [col[0] for col in desc])
        # # print([desc[0] for desc in cursor.description])
        # colkeys = {}
        # for ind, desc in enumerate(cursor.description):
        #     # print(desc[0])
        #     # print(x[0][ind])
        #     colkeys.update({desc[0]: ind})

        # # print(colkeys['FirstName'])

        # for i in range(100):
        #     x = y[i-1]

        #     # print(x[colkeys['firstname']], x[colkeys['lastname']], x[colkeys['middlename']], (x[colkeys['firstname']]+'@provider.com'), '12345', x[colkeys['addressofrecordline1']], x[colkeys['addressofrecordline2']], x[colkeys['addressofrecordcity']], x[colkeys['addressofrecordcountycode']], x[colkeys['addressofrecordstate']], dict(countries)['US'], x[colkeys['addressofrecordzipcode']][:5])

        #     provider = User_Custom.objects.create_provider(firstname=(x[colkeys['firstname']] or 'NA').capitalize(), lastname=(x[colkeys['lastname']] or 'NA').capitalize(), middlename=(x[colkeys['middlename']] or 'NA').capitalize(), email=(fk.user_name()+'@provider.com'), username=((x[colkeys['firstname']] or 'NA').capitalize()+'@provider.com'), password='12345', address=(x[colkeys['addressofrecordline1']] or 'NA').capitalize(), address2=(x[colkeys['addressofrecordline2']] or 'NA').capitalize(), city=(x[colkeys['addressofrecordcity']] or 'NA').capitalize(), county_code=(x[colkeys['addressofrecordcountycode']] or 'NA').capitalize(), state=x[colkeys['addressofrecordstate']], country=dict(countries)['US'], zipcode=(x[colkeys['addressofrecordzipcode']] or 'NA')[:5])

        #     print(provider)

        #     if x[colkeys['on_probation']] == 1:
        #         on_probation = 'Probation'
        #     else:
        #         on_probation = 0

        #     License.objects.get_or_create(prov=provider,
        #     license_number= x[colkeys['licensenumber']], license_type=x[colkeys['licensetype']], status1=x[colkeys['shortdescription']], status2=on_probation, number_of_negatives=x[colkeys['number_of_negatives']], has_felony=x[colkeys['has_felony']], has_misdemeanor=x[colkeys['has_misdemeanor']], has_citation=x[colkeys['has_citation']], has_action=x[colkeys['has_action']], has_courtorder=x[colkeys['has_courtorder']], has_reprimand=x[colkeys['has_reprimand']], has_probation=x[colkeys['has_probation']], has_malpractice=x[colkeys['has_malpractice']], has_suspension=x[colkeys['has_suspension']])

        # for i in range(10):
        #     User_Custom.objects.create_member(firstname=fk.first_name(), lastname=fk.last_name(), middlename=fk.first_name(), email=fk.email(), username=fk.user_name(),password='1234', address=fk.street_address(), city=fk.city(), county_code=fk.country_code(), state=fk.state(), country=fk.country(), zipcode=fk.postcode())
        #     # print(cursor.fetchrow())
        # # timedelta()

        # for i in range(100):
        # #    Badges.objects.get_or_create(badge=Badge.objects.all()[i % 2], prov=Provider.objects.all()[i])

        #    provider = Provider.objects.get(provider=Provider.objects.all()[i])
        #    provider.badge = Badge.objects.all()[max(i % 2, 1)]
        # #    print(provider, Badge.objects.all()[max(i % 2, 1)])
        #    provider.save()
        #    if provider.badge is None:
        #        print(provider)
        try:

            # Return time slots for open and

            # order = Availability.objects.create(timedelta(hours=17), timedelta(hours=8), 30, prov=Provider.objects.all()[0])

            # Voting system 1 vote per member
            # for i in range(100):
            #     vote = Vote.objects.get_or_create_from_request(self.request, mem=Member.objects.all()[(i % 9) + 1], prov=Provider.objects.all()[i], vote=1)

            #     print(Provider.objects.all()[i].votee, vote.vote)

            # x = Availability.objects.get(slot=)
            # y = Availability.objects.filter(slot=timedelta(hours=8))

            # print(order[i].open)
            # print(str((datetime.now() + timedelta(days=1)).date()))

            # x = 0
            # # print(order)
            # for i in range(18):
            #     if order[i].open == True:
            #         x = i
            #         print(x)
            #         break
            #     else:
            #         continue

            # if order[x].open == True:

            #     open = ((datetime.now() + timedelta(days=1)).date().strftime("%Y-%m-%d"))
            #     close = ((datetime.now() + timedelta(days=2)).date().strftime("%Y-%m-%d"))
            #     y = Appointment.objects.create(member=Member.objects.all()[1], slot =order[x].slot, start_date=open, end_date=close, prov=order[x].prov)
            #     order[x].open = False
            #     order[x].save()
            #     print(order[x])

            # print(y)
            # print(x,y)

            # Update and create measures for providers
            # x, y = MeasuresTrack.objects.get_or_create(Measure.objects.all()[0], Provider.objects.all()[0].provider, Member.objects.all()[0].member, 30)

            # print(order)
            # print(Provider.objects.get_or_create_from_request(self.request))
            # for i in range(4):
            #     if isinstance(order[i], Availability):
            #         # print(order[i].open)
            #         order[i].open = True
            #         order[i].save()
            # for i in order:
            #     if isinstance(i, Availability):
            #         if i.isopen() == False:
            #             print(i)
            # print(order)
            context = {
                # 'order': order,
            }

            print(self.request.baseuser)
            print(self.request.session.session_key)

            return render(self.request, "home.html", context)
        except ObjectDoesNotExist:
            print(self.request.customer)
            return render(self.request, "home.html")  # , context)

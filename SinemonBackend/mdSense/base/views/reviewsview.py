from base.models.provider import Provider
from base.models.reviews import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from drf_multiple_model.views import ObjectMultipleModelAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view  # , permission_classes

import json


COMMENT_TYPE = {
    "SATISFIED": "1",
    "NOT SATISFIED": "2",
    "ECSTATIC": "3",
    "DISAPPOINTED": "4",
    "OVER": "5",
    "LIVID": "6",
}


def commence_review(request, member_id):
    print(request.GET.get("pid", None))
    provider_id = request.GET.get("pid", None)
    pv = Patientvisit.objects.filter(
        member_id=member_id, prov_id=provider_id, counter=0
    )

    if request.method == "GET":

        if pv.exist():
            questions = pv[0].getquestions()

            return JsonResponse(
                ReportCardQuestionsSerializer(questions, many=True).data, safe=False
            )

    if request.method == "POST":

        # print(request.body)
        data = json.loads(request.body)

        # print(data)
        dr_rating = data.get("dr_stars")
        staff_rating = data.get("staff_stars")
        bedside_rating = data.get("bedside_stars")
        office_rating = data.get("office_stars")
        comment = data.get("comment", None)
        comment_type = comment.get("comment_type", None)
        comment = comment.get("comment", None)
        status = "ESC"
        answers = data.get("questions")
        # print(comment)
        # print(COMMENT_TYPE.get(comment_type))
        member = Member.objects.filter(member_id=member_id)[0]
        provider = Provider.objects.filter(provider_id=provider_id)[0]

        comment = (
            Comment.objects.create(
                comment=comment,
                comment_type=COMMENT_TYPE.get(comment_type),
                status=status,
                member=member,
                prov=provider,
            )
            if exist(comment)
            else None
        )
        # print(answers)

        if pv.exists():
            pv = pv[0]

            if pv.comment_required() and comment != None:
                pv.update(
                    counter=pv.getCount() + 1,
                    dr_rating=dr_rating,
                    staff_rating=staff_rating,
                    office_rating=office_rating,
                    bedside_rating=bedside_rating,
                    comment=comment,
                )
            else:
                if comment != None:
                    pv.update(
                        counter=pv.getCount() + 1,
                        dr_rating=dr_rating,
                        staff_rating=staff_rating,
                        office_rating=office_rating,
                        bedside_rating=bedside_rating,
                        comment=comment,
                    )
                elif not pv.comment_required():
                    pv.update(
                        counter=pv.getCount() + 1,
                        dr_rating=dr_rating,
                        staff_rating=staff_rating,
                        office_rating=office_rating,
                        bedside_rating=bedside_rating,
                    )
                else:
                    raise ("Comment Required")

            for answer in answers:
                # print(answer, 'answer')
                pv.answer(
                    member=member,
                    prov=provider,
                    answer=answer.get("answer"),
                    id=answer.get("id"),
                )

    #     user = User_Custom.objects.filter(id=member_id, is_member=True)[0]
    #     user.update(city, state, zipcode, username, icon, first_name, middle_name, last_name, street_address, street_address2, phone_number)

    #     print(user.zipcode)

    #     return JsonResponse(MembersSerializer(Member.objects.filter(member_id=member_id)[0]).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def exist(x):

    return False if x is None or x == "None" else True

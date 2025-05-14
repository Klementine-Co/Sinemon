from allauth.account.views import LoginView, LogoutView, SignupView

from base.models.user import User_Custom

from django.middleware.csrf import get_token


class MemberLogin(LoginView):
    template_name = "login.html"


class MemberLogout(LogoutView):
    template_name = "logout.html"


class MemberSignup(SignupView):
    template_name = "login.html"


# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response

# from datetime import datetime as dt


# class MemberObtainAuthToken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         response = super(MemberObtainAuthToken, self).post(request, *args, **kwargs)
#         token = Token.objects.get(key=response.data['token'])
#         token.email = User_Custom.objects.filter(id=token.user_id)[0].email

#         print()
#         print()
#         print(dt.now())
#         print({'token': token.key, 'id': token.user_id, 'email':token.email})

#         return Response({'token': token.key, 'id': token.user_id, 'email':token.email})


from django.conf import settings
from django.contrib.auth import login, logout
from rest_framework import views, generics, response, permissions, authentication
from base.serializers.userserializer import UserLoginSerializer
from base.serializers.loginserializer import LoginSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny

import json

from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from drf_multiple_model.views import ObjectMultipleModelAPIView

from django.shortcuts import redirect, reverse


@receiver(user_logged_out)
def printl(sender, user, request, **kwargs):
    print("logged out")


@receiver(user_logged_in)
def printll(sender, user, request, **kwargs):
    print("logged in")


class CsrfExemptSessionAuthentication(authentication.SessionAuthentication):
    def enforce_csrf(self, request):
        return


class LoginViewMember(views.APIView):
    permission_classes = (AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):

        # print('request in login', request.headers['Cookie'])

        serializer = LoginSerializer(data=request.data)
        # print(serializer, 'serializer')
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        # csrf_token = get_token(request)
        resp = redirect(reverse("base:member_view") + "?mid={}".format(user.id))
        # print(request.META)
        # print(request.headers['Cookie'])

        # resp.headers['Cookie'] = request.headers['Cookie']

        # print(response.Response(UserLoginSerializer(user).data).headers)
        return resp


class LoginViewProvider(views.APIView):
    permission_classes = (AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):

        print("request in login", request)

        serializer = LoginSerializer(data=request.data)
        # print(serializer, 'serializer')
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        resp = redirect(reverse("base:provider_view") + "?pid={}".format(user.id))

        # resp.headers['Cookie'] = request.headers['Cookie']

        # print(response.Response(UserLoginSerializer(user).data).headers)
        return resp
        # return response.Response(UserLoginSerializer(user).data)


# class LoginView(views.APIView):
#     permission_classes = (AllowAny,)
#     authentication_classes = (CsrfExemptSessionAuthentication, )

#     def post(self, request):

#         print('request in login', request.data)

#         serializer = LoginSerializer(data=request.data)
#         # print(serializer, 'serializer')
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)
#         return response.Response(UserLoginSerializer(user).data)


class LogoutView(views.APIView):
    permission_classes = (AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        print(request)
        logout(request)
        # return response.Response({"success": "Logged Out '{}' created successfully".format(None)})
        return response.Response({"success": "Logged out successfully"})


class RegisterView(generics.CreateAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        user.backend = settings.AUTHENTICATION_BACKENDS[1]
        login(self.request, user)


class UserView(generics.RetrieveAPIView):
    serializer_class = UserLoginSerializer
    lookup_field = "pk"

    def get_object(self, *args, **kwargs):
        return self.request.user

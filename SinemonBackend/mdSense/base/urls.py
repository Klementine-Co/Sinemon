from base.views import *
from django.urls import path
from django.conf.urls import url, include

# from allauth.account.views import LoginView, LogoutView, SignupView
from django.conf.urls.static import static

app_name = "base"
# from django.views.generic.base import RedirectView
urlpatterns = (
    [
        # path('products', ProductsView.as_view(), name = 'products'),
        # url(r'^accounts/signup/$', SignupView, name='account_signup'),
        # path('api/pcodes/<cat>', get_Pcodes, name='get_pcodes'),
        path("api/mcodes/", get_Mcodes, name="get_mcodes"),
        path("api/poscodes/", get_POScodes, name="get_poscodes"),
        path("api/pcodes/", get_Pcodes, name="get_pcodes"),
        path("api/pcodes/desc/", get_PcodesCat, name="get_pcodescat"),
        path("api/dcodes/", get_Dcodes, name="get_dcodes"),
        path("api/dcodes/desc/", get_DcodesCat, name="get_dcodescat"),
        url(r"^test/register/$", RegisterView.as_view(), name="user-register"),
        url(r"^test/login/$", LoginView.as_view(), name="user-login"),
        url(r"^test/logout/$", LogoutView.as_view(), name="user-logout"),
        url(r"^test/current/$", UserView.as_view(), name="user-current"),
        url(r"^member/login/$", LoginViewMember.as_view(), name="member-login"),
        url(r"^provider/login/$", LoginViewProvider.as_view(), name="provider-login"),
        # path(r'^.*$', RedirectView.as_view(url='<url_to_home_view>', permanent=False), name='index')
        # path('account/login/', MemberObtainAuthToken.as_view()),
        path("dj-rest-auth/", include("dj_rest_auth.urls")),
        # url(r'^accounts/logout/$', LogoutView, name='account_logout'),
        path("", HomeView.as_view(), name="home"),
        # path('api/appointment', AppointmentAPI.as_view()),
        # path('api/appointment/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', AppointmentAPI.as_view()),
        # path('api/badges', BadgesAPI.as_view()),
        # path('api/badges/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', BadgesAPI.as_view()),
        # path('api/scores', ScoresAPI.as_view()),
        # path('api/scores/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', ScoresAPI.as_view()),
        path("api/providers", ProviderAPI.as_view()),
        path("api/providers/", ProviderAPI.as_view()),
        path("api/listproviders", ProviderSearchAPI.as_view()),
        path("api/listproviders/", ProviderSearchAPI.as_view()),
        path("api/members", MembersAPI.as_view()),
        path("api/members/", MembersAPI.as_view()),
        path("api/listmembers", MemberAPI.as_view()),
        path("api/listmembers/", MemberAPI.as_view()),
        # path('api/member/update/member/<member_id>/', update_member, name='update_member'),
        path(
            "api/member/update/member/<member_id>", update_member, name="update_member"
        ),
        path(
            "api/member/update/medicalinsurance/<member_id>",
            update_med_insurance,
            name="update_med_insurance",
        ),
        path(
            "api/member/update/rxinsurance/<member_id>",
            update_rx_insurance,
            name="update_rx_insurance",
        ),
        path(
            "api/member/update/rxdiscountinsurance/<member_id>",
            update_discrx_insurance,
            name="update_discrx_insurance",
        ),
        path("api/member/update/meds/<member_id>", update_meds, name="update_meds"),
        path("api/member/update/labs/<member_id>", update_labs, name="update_labs"),
        path(
            "api/member/update/bodycomp/<member_id>",
            update_bodycomp,
            name="update_bodycomp",
        ),
        path("api/member/create/member/", create_member, name="create_member"),
        path(
            "api/member/create/medicalinsurance/<member_id>",
            create_med_insurance,
            name="create_med_insurance",
        ),
        path(
            "api/member/create/rxinsurance/<member_id>",
            create_rx_insurance,
            name="create_rx_insurance",
        ),
        path(
            "api/member/create/rxdiscountinsurance/<member_id>",
            create_discrx_insurance,
            name="create_discrx_insurance",
        ),
        path("api/member/create/meds/<member_id>", create_meds, name="create_meds"),
        path("api/member/create/labs/<member_id>", create_labs, name="create_labs"),
        path(
            "api/member/create/mdnotes/<member_id>",
            create_mdnotes,
            name="create_mdnotes",
        ),
        path(
            "api/member/delete/mdnotes/<member_id>",
            delete_mdnotes,
            name="delete_mdnotes",
        ),
        path("api/member/delete/meds/<member_id>", delete_meds, name="delete_meds"),
        path("api/member/delete/labs/<member_id>", delete_labs, name="delete_labs"),
        path("api/member/review/<member_id>", commence_review, name="review"),
        path("api/claim/view/", ClaimView.as_view(), name="claim_view"),
        path("api/claim/view", ClaimView.as_view()),
        path("api/member", MProfileView.as_view()),
        path("api/member/", MProfileView.as_view(), name="member_view"),
        path("api/provider", PProfileView.as_view()),
        path("api/provider/", PProfileView.as_view(), name="provider_view"),
        path("api/provider_queue", QQueueView.as_view()),
        path("api/provider_queue/", QQueueView.as_view(), name="provider_queue_view"),
        path(
            "api/updateLobby/<provider_id>",
            update_lobbyConfig,
            name="update_lobbyConfig",
        ),
        # path(r'api/queues/(?P<providerid>\d{1,12})/$', queues),
        url(r"^api/queues/(?P<providerid>\d{1,12})/$", queues, name="queues"),
        path(
            "api/queue/config_update/<provider_id>",
            update_queueConfig,
            name="update_queueConfig",
        ),
        path("api/queue/startQueue/", start_queue, name="start_queue"),
        path("api/queue/stopQueue/", pause_queue, name="pause_queue"),
        path("api/queue/join/", join_queue.as_view()),
        path("api/queue/leave/", join_queue.as_view()),
        path("api/queue/m-confirm/", member_confirm_arrival.as_view()),
        # path('api/providersdesc', ProviderDescAPI.as_view()),
        path(
            "api/providers/<provider_id>",
            ProviderViewAPI.as_view(
                {"get": "retrieve", "put": "update"}, lookup_field="provider_id"
            ),
        ),
        # path('api/providers/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', ProviderAPI.as_view()),
        # path('api/measures', MeasuresAPI.as_view()),
        path("api/loadlicenses", LoadFromDBProvider.as_view()),
        path("api/loadlicensesinfo", LoadFromDBLicenseInfo.as_view()),
        # path('api/measures/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', MeasuresAPI.as_view()),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)

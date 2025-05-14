from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model
from django.contrib.admin.widgets import FilteredSelectMultiple

from django.contrib.auth.models import Permission


from base.models.user import User_Custom

# Register your models here.
from base.models.badge import *

from base.models.case import *
from base.models.license import *
from base.models.recommendation import *
from base.models.provider import *
from base.models.member import *
from base.models.score import *
from base.models.vote import *
from base.models.measure import *
from base.models.baseuser import *
from base.models.appointment import *
from base.models.enrollment import *
from base.models.queue import *

from base.models.medinfo import *
from base.models.medinfo_release import *
from base.models.insurances import *

from base.models.notifications import *

from base.models.connections import *

# from django.contrib.auth.admin import UserAdmin

from base.models.reviews import *

from base.models.MEDCODES import *

from base.models.claim import *

# class CustomUserAdmin(UserAdmin):
#     fieldsets = (
#         *UserAdmin.fieldsets,  # original form fieldsets, expanded
#         (                      # new fieldset added on to the bottom
#             'Custom Field Heading',  # group heading of your choice; set to None for a blank space instead of a header
#             {
#                 'fields': (
#                     'salutation',
#                 ),
#             },
#         ),
#     )

admin.site.site_header = "mdSense Administration"
admin.site.site_title = "mdSense admin site"
admin.site.index_title = "mdSense Admin"


admin.site.register(Permission)

admin.site.register(Accounts)
admin.site.register(Badge)
admin.site.register(Badges)
# admin.site.register(Provider)
admin.site.register(Provider_Desc)
admin.site.register(BaseUser)
admin.site.register(Member)
# admin.site.register(Comment)
admin.site.register(License)
admin.site.register(Recommendation)
admin.site.register(Measure)
admin.site.register(MeasuresTrack)
admin.site.register(Measures)
admin.site.register(Scores)
admin.site.register(ScoreTrack)
admin.site.register(Points)
admin.site.register(Case)
admin.site.register(Vote)
admin.site.register(Enrollment)
admin.site.register(Queue)
admin.site.register(QueueConfig)
# admin.site.register(Votes)

# admin.site.register(Availability)
# admin.site.register(TimeSlot)
# admin.site.register(Appointment)


admin.site.register(AppointmentType)
admin.site.register(Office)
admin.site.register(OfficeConfig)


admin.site.register(ValidIn)
admin.site.register(Actions)
admin.site.register(Probations)
admin.site.register(Convictions)
admin.site.register(Accusations)
admin.site.register(Malpractices)
admin.site.register(Arbitrations)
admin.site.register(Citations)
admin.site.register(Number_negatives_v)
admin.site.register(Number_of_negatives)
admin.site.register(Otherstate)

admin.site.register(Pcodes)
admin.site.register(Dcodes)
admin.site.register(Mcodes)
admin.site.register(POScodes)

admin.site.register(Claim_Info)
admin.site.register(Claim_Detail)
admin.site.register(Claim_Dx)
admin.site.register(Claim_Mx)


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = User_Custom
        fields = (
            "email",
            "username",
        )

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """

    # password = ReadOnlyPasswordHashField()

    class Meta:
        model = User_Custom
        fields = ("email", "password", "is_active", "is_admin", "is_staff")

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("email", "is_admin", "is_staff", "is_member")
    list_filter = ("is_admin", "is_staff", "is_member")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "account_number",
                    "username",
                    "ssn",
                    "first_name",
                    "middle_name",
                    "last_name",
                    "street_address",
                    "street_address2",
                    "city",
                    "state",
                    "county_code",
                    "zipcode",
                    "country",
                    "icon",
                )
            },
        ),
        (
            "Permissions",
            {"fields": ("is_admin", "is_provider", "is_member", "is_staff")},
        ),
        (
            "Group Permissions",
            {
                "fields": (
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(User_Custom, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.


class UserInlineAdmin(admin.StackedInline):
    model = BaseUser


class ProviderAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_email", "get_zipcode")
    # list_filter = ('provider__user__zipcode',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "provider__user__zipcode",
        "provider__user__city",
        "provider__user__email",
    )
    ordering = ("provider__user__zipcode",)
    filter_horizontal = ()

    def get_email(self, obj):
        return obj.provider.user.email

    get_email.short_description = "Email"
    get_email.admin_order_field = "provider__email"

    def get_zipcode(self, obj):
        return obj.provider.user.zipcode

    get_zipcode.short_description = "Zipcode"
    get_zipcode.admin_order_field = "provider__zipcode"


# Now register the new ProviderAdmin...
admin.site.register(Provider, ProviderAdmin)


class RenderingProviderAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_email", "get_zipcode")
    # list_filter = ('provider__user__zipcode',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "rendering_provider__provider__user__zipcode",
        "rendering_provider__provider__user__city",
        "rendering_provider__provider__user__email",
    )
    ordering = ("rendering_provider__provider__user__zipcode",)
    filter_horizontal = ()

    def get_email(self, obj):
        return obj.rendering_provider.provider.user.email

    get_email.short_description = "Email"
    get_email.admin_order_field = "rendering_provider__provider__email"

    def get_zipcode(self, obj):
        return obj.rendering_provider.provider.user.zipcode

    get_zipcode.short_description = "Zipcode"
    get_zipcode.admin_order_field = "rendering_provider__provider__zipcode"


admin.site.register(RenderingProvider, RenderingProviderAdmin)
# admin.site.register(Group)


class PrescriptionAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_email", "get_ndc")
    # list_filter = ('provider__user__zipcode',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ("ndc", "member__member__user__email")
    # ordering = ('member.user',)
    ordering = ("member__member__user__email",)
    filter_horizontal = ()

    def get_email(self, obj):
        return obj.member

    get_email.short_description = "Email"
    get_email.admin_order_field = "member__member__user__email"

    def get_ndc(self, obj):
        return obj.ndc

    get_ndc.short_description = "NDC"
    get_ndc.admin_order_field = "ndc"


admin.site.register(Prescription, PrescriptionAdmin)


class BodyCompAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_email", "updated", "height", "weight", "bf", "measurement")
    list_filter = ("measurement",)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ("member__member__user__email", "updated")
    # ordering = ('member.user',)
    ordering = ("updated", "member__member__user__email", "measurement")
    filter_horizontal = ()

    def get_email(self, obj):
        return obj.member

    get_email.short_description = "Email"
    get_email.admin_order_field = "member__member__user__email"

    # def get_updated(self, obj):
    #     return obj.ndc
    # get_ndc.short_description = 'NDC'
    # get_ndc.admin_order_field = 'ndc'


admin.site.register(BodyComp, BodyCompAdmin)


class mdNotesAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_mbr_email", "get_prov_email", "uploaded")
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "prov__provider__user__email",
        "uploaded",
        "note",
    )
    # ordering = ('member.user',)
    ordering = (
        "uploaded",
        "member__member__user__email",
        "prov__provider__user__email",
    )
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"

    def get_prov_email(self, obj):
        return obj.prov

    get_prov_email.short_description = "Provider email"
    get_prov_email.admin_order_field = "prov__provider__user__email"


admin.site.register(mdNotes, mdNotesAdmin)


class labsAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_mbr_email", "get_prov_email", "brief_desc", "status")
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "prov__provider__user__email",
        "uploaded",
        "brief_desc",
        "status",
    )
    # ordering = ('member.user',)
    ordering = (
        "uploaded",
        "member__member__user__email",
        "prov__provider__user__email",
        "status",
    )

    autocomplete_fields = ["prov"]
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"

    def get_prov_email(self, obj):
        return obj.prov

    get_prov_email.short_description = "Provider email"
    get_prov_email.admin_order_field = "prov__provider__user__email"


admin.site.register(labs, labsAdmin)


class VisitsAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = (
        "get_mbr_email",
        "get_prov_email",
        "visit_date",
        "approved_activity",
    )
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "prov__provider__user__email",
        "visit_date",
        "approved_activity",
    )
    # ordering = ('member.user',)
    ordering = (
        "member__member__user__email",
        "prov__provider__user__email",
        "visit_date",
        "approved_activity",
    )
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"

    def get_prov_email(self, obj):
        return obj.prov

    get_prov_email.short_description = "Provider email"
    get_prov_email.admin_order_field = "prov__provider__user__email"


admin.site.register(Visits, VisitsAdmin)


class VaccinationsAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = (
        "get_mbr_email",
        "get_prov_email",
        "vaccination",
        "vaccination_date",
    )
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "prov__provider__user__email",
        "vaccination",
        "vaccination_date",
    )
    # ordering = ('member.user',)
    ordering = (
        "member__member__user__email",
        "prov__provider__user__email",
        "vaccination",
        "vaccination_date",
    )
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"

    def get_prov_email(self, obj):
        return obj.prov

    get_prov_email.short_description = "Provider email"
    get_prov_email.admin_order_field = "prov__provider__user__email"


admin.site.register(Vaccinations, VaccinationsAdmin)


class MedInsuranceAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_mbr_email", "insurer", "id_member", "uploaded")
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ("member__member__user__email", "insurer", "id_member", "uploaded")
    # ordering = ('member.user',)
    ordering = ("member__member__user__email", "insurer", "id_member", "uploaded")
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"


admin.site.register(MedInsurance, MedInsuranceAdmin)


class RxInsuranceAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_mbr_email", "insurer", "id_member", "uploaded")
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "insurer",
        "id_member",
        "uploaded",
        "rxbin",
        "rxpcn",
        "rxgrp",
    )
    # ordering = ('member.user',)
    ordering = ("member__member__user__email", "insurer", "id_member", "uploaded")
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"


admin.site.register(RxInsurance, RxInsuranceAdmin)


class RxDiscountAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_mbr_email", "insurer", "id_member", "uploaded")
    # list_filter = ('measurement',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "member__member__user__email",
        "insurer",
        "id_member",
        "uploaded",
        "rxbin",
        "rxpcn",
        "rxgrp",
    )
    # ordering = ('member.user',)
    ordering = ("member__member__user__email", "insurer", "id_member", "uploaded")
    filter_horizontal = ()

    def get_mbr_email(self, obj):
        return obj.member

    get_mbr_email.short_description = "Member email"
    get_mbr_email.admin_order_field = "member__member__user__email"


admin.site.register(RxDiscount, RxDiscountAdmin)


class NotificationAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = (
        "get_receiver_email",
        "get_sender_email",
        "msg",
        "notification_type",
        "time",
        "read_msg",
    )
    list_filter = ("notification_type", "read_msg")
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = (
        "sender__user__email",
        "receiver__user__email",
        "msg",
        "thread_id",
        "time",
    )
    # ordering = ('member.user',)
    ordering = ("time", "thread_id")
    # list_filter = ('is_admin','is_staff', 'is_member')
    filter_horizontal = ()

    def get_receiver_email(self, obj):
        return obj.receiver

    get_receiver_email.short_description = "Receiver email"
    get_receiver_email.admin_order_field = "receiver__user__email"

    def get_sender_email(self, obj):
        return obj.sender

    get_sender_email.short_description = "Sender email"
    get_sender_email.admin_order_field = "sender__user__email"


admin.site.register(Notification, NotificationAdmin)


admin.site.register(Medinfo_release)


class ConnectionAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = ("get_user_email", "conn_id", "time", "connected")
    list_filter = ("connected",)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ("user__email", "connected", "conn_id")
    # ordering = ('member.user',)
    ordering = ("time", "conn_id")
    # list_filter = ('is_admin','is_staff', 'is_member')
    filter_horizontal = ()

    def get_user_email(self, obj):
        return obj.user

    get_user_email.short_description = "User email"
    get_user_email.admin_order_field = "user__email"


admin.site.register(Connection, ConnectionAdmin)


class ProviderRatingsAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    list_per_page = 600
    # inlines = [UserInlineAdmin]

    # The fields to be used in displaying the User_Custom model.
    # These override the definitions on the base ProviderAdmin
    # that reference specific fields on auth.User_Custom.
    list_display = (
        "get_provider_email",
        "update_date",
        "rating",
        "dr_rating",
        "staff_rating",
        "bedside_rating",
        "office_rating",
        "score",
    )
    # list_filter = ( 'connected',)
    # add_fieldsets is not a standard ModelAdmin attribute. ProviderAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ("prov__provider__user__email",)
    # ordering = ('member.user',)
    ordering = (
        "update_date",
        "rating",
        "dr_rating",
        "staff_rating",
        "bedside_rating",
        "office_rating",
        "score",
    )
    # list_filter = ('is_admin','is_staff', 'is_member')
    filter_horizontal = ()

    def get_provider_email(self, obj):
        return obj.prov

    get_provider_email.short_description = "Provider email"
    get_provider_email.admin_order_field = "prov__provider__user__email"


admin.site.register(ProviderRatings, ProviderRatingsAdmin)
admin.site.register(ProviderRating)
admin.site.register(ProviderRatingHistory)
admin.site.register(ProviderQuestionsReportCard)
admin.site.register(ProviderReportCards)


admin.site.register(Comment)
admin.site.register(Patientvisit)
admin.site.register(Reportcard)
admin.site.register(Provider_reportcard)

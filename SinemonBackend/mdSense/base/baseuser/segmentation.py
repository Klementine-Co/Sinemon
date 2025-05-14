from cmsplugin_cascade.segmentation.mixins import (
    EmulateUserModelMixin,
    EmulateUserAdminMixin,
)
from admin import BaseUserProxy


class EmulateBaseUserModelMixin(EmulateUserModelMixin):
    UserModel = BaseUserProxy


class EmulateBaseUserAdminMixin(EmulateUserAdminMixin):
    UserModel = BaseUserProxy

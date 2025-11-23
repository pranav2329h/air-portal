from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    me,
    UpdateProfileView,
    change_password
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # AUTH
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),  # custom login with user data
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # PROFILE
    path("me/", me, name="me"),
    path("me/update/", UpdateProfileView.as_view(), name="update_profile"),
    path("me/change-password/", change_password, name="change_password"),
]

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterView, me, ProfileView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("token/", TokenObtainPairView.as_view()),     # login (JWT)
    path("refresh/", TokenRefreshView.as_view()),
    path("me/", me),                                   # get full user data
    path("profile/", ProfileView.as_view()),           # GET / PUT / PATCH profile
]

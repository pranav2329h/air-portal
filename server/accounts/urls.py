from django.urls import path
from .views import RegisterView, me
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("token/", TokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("me/", me),
]

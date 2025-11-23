from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    ProfileUpdateSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    """Return current logged-in user details"""
    return Response(UserSerializer(request.user).data)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/auth/profile/   -> get profile details
    PUT  /api/auth/profile/   -> update all fields
    PATCH /api/auth/profile/  -> update some fields
    """
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UserUpdateSerializer,
    ChangePasswordSerializer
)

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


# ---------------------------------------------------------
# CUSTOM LOGIN RESPONSE (ADDS USER DATA WITH TOKEN)
# ---------------------------------------------------------
class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


# ---------------------------------------------------------
# REGISTER NEW USER
# ---------------------------------------------------------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """Return user after successful registration."""
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(id=response.data["id"])
        return Response({
            "user": UserSerializer(user).data,
            "message": "Account created successfully"
        })


# ---------------------------------------------------------
# GET MY PROFILE
# ---------------------------------------------------------
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)


# ---------------------------------------------------------
# UPDATE PROFILE
# ---------------------------------------------------------
class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ---------------------------------------------------------
# CHANGE PASSWORD
# ---------------------------------------------------------
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user

        old_password = serializer.validated_data["old_password"]
        new_password = serializer.validated_data["new_password"]

        if not check_password(old_password, user.password):
            return Response(
                {"error": "Old password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

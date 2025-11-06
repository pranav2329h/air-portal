from rest_framework import generics, permissions
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)

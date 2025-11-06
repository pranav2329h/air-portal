from rest_framework import generics, permissions
from .serializers import BookingCreateSerializer, BookingSerializer
from .models import Booking

class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).select_related("flight").prefetch_related("passengers","flight__fares")

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Booking, Passenger
from .serializers import BookingSerializer, BookingCreateSerializer


class BookingListView(generics.ListAPIView):
    """
    GET /api/bookings/  → list bookings for logged-in user
    """
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return (
            Booking.objects.filter(user=user)
            .select_related(
                "flight",
                "flight__airline",
                "flight__source",
                "flight__destination",
            )
            .prefetch_related("passengers", "flight__fares")
            .order_by("-created_at")
        )


class BookingCreateView(generics.CreateAPIView):
    """
    POST /api/bookings/create/
    Body: { flight_id, fare_id, passengers: [...] , coupon_code? }
    """
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()

        return Response(
            BookingSerializer(booking).data,
            status=status.HTTP_201_CREATED,
        )

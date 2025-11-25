from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Flight, Coupon, Airport
from .serializers import FlightSerializer, CouponSerializer, AirportSerializer
from .filters import FlightFilter


class FlightListView(generics.ListAPIView):
    """
    Optional: list all flights (not used by UI right now, but handy).
    """
    queryset = (
        Flight.objects
        .select_related("airline", "source", "destination")
        .prefetch_related("fares")
    )
    serializer_class = FlightSerializer


class FlightSearchView(generics.ListAPIView):
    """
    /api/flights/search/?source=BOM&destination=DEL&date=2025-11-25
    If no query params → returns ALL flights.
    """
    queryset = (
        Flight.objects
        .select_related("airline", "source", "destination")
        .prefetch_related("fares")
    )
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = FlightFilter
    ordering_fields = ["departure_time", "base_price"]


class AirportListView(generics.ListAPIView):
    """
    /api/flights/airports/  → used by SearchForm suggestions.
    """
    queryset = Airport.objects.all().order_by("city", "code")
    serializer_class = AirportSerializer


class CouponCheckView(generics.RetrieveAPIView):
    lookup_field = "code"
    queryset = Coupon.objects.filter(active=True)
    serializer_class = CouponSerializer

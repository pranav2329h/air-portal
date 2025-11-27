from rest_framework import generics, filters
from django.db.models import Q
from .models import Flight, Airport, Coupon
from .serializers import FlightSerializer, AirportSerializer, CouponSerializer


class FlightSearchView(generics.ListAPIView):
    """
    Show filtered flights if available.
    If no flights match → return ALL flights.
    """
    serializer_class = FlightSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["departure_time", "base_price"]
    ordering = ["departure_time"]

    def get_queryset(self):
        # Base queryset (all flights)
        qs = (
            Flight.objects
            .select_related("airline", "source", "destination")
            .prefetch_related("fares")
            .order_by("departure_time")
        )

        params = self.request.query_params
        source = params.get("source")
        destination = params.get("destination")
        date = params.get("date")

        # Start with the full queryset
        filtered = qs

        # Filter by source city or code
        if source:
            filtered = filtered.filter(
                Q(source__code__iexact=source) |
                Q(source__city__icontains=source)
            )

        # Filter by destination city or code
        if destination:
            filtered = filtered.filter(
                Q(destination__code__iexact=destination) |
                Q(destination__city__icontains=destination)
            )

        # Filter by date (YYYY-MM-DD)
        if date:
            filtered = filtered.filter(departure_time__date=date)

        # ⭐ If filter returns no flights → return ALL flights
        if not filtered.exists():
            return qs

        return filtered


class FlightListView(generics.ListAPIView):
    queryset = (
        Flight.objects
        .select_related("airline", "source", "destination")
        .prefetch_related("fares")
    )
    serializer_class = FlightSerializer


class AirportListView(generics.ListAPIView):
    queryset = Airport.objects.all().order_by("city")
    serializer_class = AirportSerializer


class CouponCheckView(generics.RetrieveAPIView):
    queryset = Coupon.objects.filter(active=True)
    serializer_class = CouponSerializer
    lookup_field = "code"

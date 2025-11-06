from rest_framework import generics, filters
from .models import Flight, Coupon
from .serializers import FlightSerializer, CouponSerializer
from .filters import FlightFilter
from django_filters.rest_framework import DjangoFilterBackend

class FlightSearchView(generics.ListAPIView):
    queryset = Flight.objects.select_related("airline","source","destination").prefetch_related("fares")
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = FlightFilter
    ordering_fields = ["departure_time","base_price"]

class CouponCheckView(generics.RetrieveAPIView):
    lookup_field = "code"
    queryset = Coupon.objects.filter(active=True)
    serializer_class = CouponSerializer

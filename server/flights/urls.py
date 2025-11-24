from django.urls import path
from .views import FlightSearchView, CouponCheckView, FlightListView
from django.urls import path
from .views import FlightSearchView, CouponCheckView
from .api_airports import AirportListView

urlpatterns = [
    path("search/", FlightSearchView.as_view()),
    path("coupon/<str:code>/", CouponCheckView.as_view()),
    path("airports/", AirportListView.as_view()),   # NEW
]

urlpatterns = [
    path("", FlightListView.as_view()),              # NEW: /api/flights/
    path("search/", FlightSearchView.as_view()),     # ?source=BOM&destination=DEL&date=2025-11-06
    path("coupon/<str:code>/", CouponCheckView.as_view()),
]

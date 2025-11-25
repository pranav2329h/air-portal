from django.urls import path
from .views import FlightSearchView, CouponCheckView, FlightListView, AirportListView

urlpatterns = [
    path("search/", FlightSearchView.as_view()),
    path("list/", FlightListView.as_view()),
    path("airports/", AirportListView.as_view()),
    path("coupon/<str:code>/", CouponCheckView.as_view()),
]

from django.urls import path
from .views import FlightSearchView, CouponCheckView

urlpatterns = [
    path("search/", FlightSearchView.as_view()),               # ?source=BOM&destination=DEL&date=2025-11-06
    path("coupon/<str:code>/", CouponCheckView.as_view()),
]

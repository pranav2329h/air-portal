from django.urls import path
from .views import BookingCreateView, MyBookingsView

urlpatterns = [
    path("", MyBookingsView.as_view()),      # GET: my bookings
    path("create/", BookingCreateView.as_view()),  # POST
]

from django.urls import path
from .views import BookingCreateView, BookingListView

urlpatterns = [
    path("", BookingListView.as_view()),          # GET → user bookings
    path("create/", BookingCreateView.as_view()), # POST → create booking
]

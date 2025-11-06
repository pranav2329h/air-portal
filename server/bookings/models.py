from django.db import models
from django.contrib.auth import get_user_model
from flights.models import Flight, Fare, Coupon, CabinClass
User = get_user_model()

class BookingStatus(models.TextChoices):
    HOLD = "HOLD", "Hold"
    CONFIRMED = "CONFIRMED", "Confirmed"
    CANCELLED = "CANCELLED", "Cancelled"

class Passenger(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    passport_id = models.CharField(max_length=32)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    flight = models.ForeignKey(Flight, on_delete=models.PROTECT)
    cabin_class = models.CharField(max_length=20, choices=CabinClass.choices)
    passengers = models.ManyToManyField(Passenger, related_name="bookings")
    coupon = models.ForeignKey(Coupon, null=True, blank=True, on_delete=models.SET_NULL)
    price_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.HOLD)
    pnr = models.CharField(max_length=8, unique=True)  # simple PNR
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.pnr} - {self.status}"

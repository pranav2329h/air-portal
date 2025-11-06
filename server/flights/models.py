from django.db import models

class Airport(models.Model):
    code = models.CharField(max_length=5, unique=True)  # e.g. BOM, DEL
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self): return f"{self.code} - {self.city}"

class Airline(models.Model):
    code = models.CharField(max_length=3, unique=True)  # AI, 6E
    name = models.CharField(max_length=100)

    def __str__(self): return self.name

class Flight(models.Model):
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE)
    flight_number = models.CharField(max_length=10)     # e.g., AI-101
    source = models.ForeignKey(Airport, on_delete=models.PROTECT, related_name="departures")
    destination = models.ForeignKey(Airport, on_delete=models.PROTECT, related_name="arrivals")
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    aircraft = models.CharField(max_length=50, blank=True)  # A320, B737

    class Meta:
        indexes = [models.Index(fields=["source","destination","departure_time"])]

    def __str__(self): return f"{self.airline.code}-{self.flight_number}"

class CabinClass(models.TextChoices):
    ECONOMY = "ECONOMY", "Economy"
    PREMIUM = "PREMIUM", "Premium Economy"
    BUSINESS = "BUSINESS", "Business"
    FIRST = "FIRST", "First"

class Fare(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name="fares")
    cabin_class = models.CharField(max_length=20, choices=CabinClass.choices)
    total_seats = models.PositiveIntegerField(default=0)
    seats_available = models.PositiveIntegerField(default=0)
    multiplier = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)  # price factor

class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=200, blank=True)
    discount_percent = models.PositiveIntegerField(default=0)  # e.g., 10 = 10%
    active = models.BooleanField(default=True)
    valid_till = models.DateField(null=True, blank=True)

from flights.models import Airport, Airline, Flight, Fare, Coupon, CabinClass
from datetime import datetime, timedelta

bom = Airport.objects.get_or_create(code="BOM", defaults={"name":"Chhatrapati Shivaji","city":"Mumbai","country":"India"})[0]
delh = Airport.objects.get_or_create(code="DEL", defaults={"name":"Indira Gandhi","city":"New Delhi","country":"India"})[0]
ai = Airline.objects.get_or_create(code="AI", defaults={"name":"Air India"})[0]

dep = datetime.now().replace(hour=15, minute=0, second=0, microsecond=0)
arr = dep + timedelta(hours=2, minutes=10)
f = Flight.objects.create(airline=ai, flight_number="AI-501", source=bom, destination=delh,
                          departure_time=dep, arrival_time=arr, base_price=4500, aircraft="A320")

Fare.objects.bulk_create([
    Fare(flight=f, cabin_class=CabinClass.ECONOMY, total_seats=120, seats_available=90, multiplier=1.00),
    Fare(flight=f, cabin_class=CabinClass.BUSINESS, total_seats=16, seats_available=12, multiplier=2.5),
])

Coupon.objects.create(code="WELCOME10", description="10% off", discount_percent=10, active=True)
print("Seeded!")

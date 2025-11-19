import random
from datetime import datetime, timedelta

from flights.models import Airline, Airport, Flight, Fare, CabinClass, Coupon

print("\n🚀 Starting Database Seeding...\n")

# ------------------------------
# CLEAN OLD DATA
# ------------------------------
print("🧹 Cleaning old data...")
Fare.objects.all().delete()
Flight.objects.all().delete()
Airport.objects.all().delete()
Airline.objects.all().delete()
Coupon.objects.all().delete()
print("✔ Old data cleaned.\n")

# ------------------------------
# AIRLINES
# ------------------------------
airline_list = [
    ("AI", "Air India"),
    ("6E", "IndiGo"),
    ("UK", "Vistara"),
    ("SG", "SpiceJet"),
    ("G8", "Go First"),
    ("QR", "Qatar Airways"),
    ("EK", "Emirates"),
    ("LH", "Lufthansa"),
    ("SQ", "Singapore Airlines"),
    ("EY", "Etihad")
]

airlines = []
for code, name in airline_list:
    airlines.append(Airline.objects.create(code=code, name=name))

print(f"✔ {len(airlines)} airlines created.\n")

# ------------------------------
# AIRPORTS
# ------------------------------
airport_list = [
    ("BOM", "Mumbai Intl", "Mumbai", "India"),
    ("DEL", "Delhi Intl", "Delhi", "India"),
    ("BLR", "Bangalore Intl", "Bangalore", "India"),
    ("HYD", "Hyderabad Intl", "Hyderabad", "India"),
    ("MAA", "Chennai Airport", "Chennai", "India"),
    ("CCU", "Kolkata Airport", "Kolkata", "India"),
    ("DXB", "Dubai Intl", "Dubai", "UAE"),
    ("DOH", "Doha Intl", "Doha", "Qatar"),
    ("SIN", "Changi Airport", "Singapore", "Singapore"),
    ("FRA", "Frankfurt Intl", "Frankfurt", "Germany"),
    ("LHR", "London Heathrow", "London", "UK"),
    ("JFK", "New York JFK", "New York", "USA"),
    ("HND", "Tokyo Haneda", "Tokyo", "Japan"),
    ("SYD", "Sydney Airport", "Sydney", "Australia"),
    ("CDG", "Paris CDG", "Paris", "France"),
    ("YYZ", "Toronto Pearson", "Toronto", "Canada"),
    ("IST", "Istanbul Airport", "Istanbul", "Turkey"),
    ("BKK", "Bangkok Intl", "Bangkok", "Thailand"),
    ("MLE", "Male Intl", "Male", "Maldives"),
    ("KTM", "Kathmandu Intl", "Kathmandu", "Nepal")
]

airports = []
for code, name, city, country in airport_list:
    airports.append(Airport.objects.create(code=code, name=name, city=city, country=country))

print(f"✔ {len(airports)} airports created.\n")

# ------------------------------
# FLIGHTS + FARES
# ------------------------------
print("🛫 Creating flights...\n")

aircraft_models = ["Airbus A320", "Boeing 737", "Airbus A321", "Boeing 787", "Airbus A350"]

flight_count = 0

for _ in range(250):
    airline = random.choice(airlines)
    source, destination = random.sample(airports, 2)

    # Create naive datetime (no timezone)
    now = datetime.now().replace(tzinfo=None)
    dep = now + timedelta(days=random.randint(1, 45), hours=random.randint(0, 23))
    arr = dep + timedelta(hours=random.randint(2, 14))

    base_price = random.randint(2500, 20000)

    flight = Flight.objects.create(
        airline=airline,
        flight_number=f"{airline.code}{random.randint(100,999)}",
        source=source,
        destination=destination,
        departure_time=dep,
        arrival_time=arr,
        base_price=base_price,
        aircraft=random.choice(aircraft_models)
    )

    # Create fares for each cabin
    for cabin in CabinClass.values:
        Fare.objects.create(
            flight=flight,
            cabin_class=cabin,
            total_seats=random.randint(20, 120),
            seats_available=random.randint(5, 50),
            multiplier=round(random.uniform(1.0, 2.5), 2)
        )

    flight_count += 1

print(f"✔ {flight_count} flights created successfully.\n")

# ------------------------------
# COUPONS
# ------------------------------
print("🎟 Creating Coupons...")

Coupon.objects.create(
    code="WELCOME10",
    description="10% off for new users",
    discount_percent=10,
    active=True
)

Coupon.objects.create(
    code="FESTIVE20",
    description="20% off festival sale",
    discount_percent=20,
    active=True
)

Coupon.objects.create(
    code="PREMIUM5",
    description="5% off Premium cabin only",
    discount_percent=5,
    active=True
)

print("✔ Coupons created.\n")

print("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY 🎉")

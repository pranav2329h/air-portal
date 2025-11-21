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
]

airports = []
for code, name, city, country in airport_list:
    airports.append(Airport.objects.create(code=code, name=name, city=city, country=country))

print(f"✔ {len(airports)} airports created.\n")

# ------------------------------
# FLIGHTS FOR EVERY DAY
# ------------------------------
print("🛫 Creating guaranteed flights...\n")

start_date = datetime.now()
days_to_generate = 60   # next 60 days

aircraft_models = ["Airbus A320", "Boeing 737"]

flight_count = 0

for day_offset in range(days_to_generate):
    for source in airports:
        for destination in airports:
            if source == destination:
                continue

            # CREATE 2 FLIGHTS PER DAY PER ROUTE
            for _ in range(2):
                dep = start_date + timedelta(days=day_offset, hours=random.randint(6, 20))
                arr = dep + timedelta(hours=random.randint(2, 4))

                airline = random.choice(airlines)
                price = random.randint(3000, 15000)

                flight = Flight.objects.create(
                    airline=airline,
                    flight_number=f"{airline.code}{random.randint(100,999)}",
                    source=source,
                    destination=destination,
                    departure_time=dep,
                    arrival_time=arr,
                    base_price=price,
                    aircraft=random.choice(aircraft_models)
                )

                # Add 4 cabin types
                for cabin in CabinClass.values:
                    Fare.objects.create(
                        flight=flight,
                        cabin_class=cabin,
                        total_seats=50,
                        seats_available=random.randint(10, 40),
                        multiplier=random.uniform(1.0, 2.5)
                    )

                flight_count += 1

print(f"✔ {flight_count} flights created successfully!\n")

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

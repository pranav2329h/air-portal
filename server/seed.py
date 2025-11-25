import random
from datetime import datetime, timedelta

from flights.models import Airline, Airport, Flight, Fare, CabinClass, Coupon
from django.utils.timezone import make_naive


print("\n🚀 Starting Database Seeding...\n")

# ---------------------------------------
# CLEAN OLD DATA
# ---------------------------------------
print("🧹 Cleaning old data...")
Fare.objects.all().delete()
Flight.objects.all().delete()
Airport.objects.all().delete()
Airline.objects.all().delete()
Coupon.objects.all().delete()
print("✔ Old data cleaned.\n")


# ---------------------------------------
# AIRLINES
# ---------------------------------------
airline_list = [
    ("AI", "Air India"),
    ("6E", "IndiGo"),
    ("UK", "Vistara"),
    ("SG", "SpiceJet"),
    ("G8", "Go First"),
    ("QR", "Qatar Airways"),
    ("EK", "Emirates"),
    ("SQ", "Singapore Airlines"),
    ("LH", "Lufthansa"),
    ("EY", "Etihad Airways"),
]

airlines = [Airline.objects.create(code=a, name=b) for a, b in airline_list]
print(f"✔ {len(airlines)} airlines created.\n")


# ---------------------------------------
# AIRPORTS
# ---------------------------------------
airport_data = [
    ("BOM", "Mumbai Intl", "Mumbai", "India"),
    ("DEL", "Delhi Intl", "Delhi", "India"),
    ("BLR", "Bangalore Intl", "Bangalore", "India"),
    ("HYD", "Hyderabad Intl", "Hyderabad", "India"),
    ("MAA", "Chennai Intl", "Chennai", "India"),
    ("CCU", "Kolkata Intl", "Kolkata", "India"),
    ("AMD", "Ahmedabad Intl", "Ahmedabad", "India"),
    ("PNQ", "Pune Airport", "Pune", "India"),
    ("GOI", "Goa Airport", "Goa", "India"),
    ("JAI", "Jaipur Intl", "Jaipur", "India"),
    ("DXB", "Dubai Intl", "Dubai", "UAE"),
    ("DOH", "Hamad Intl", "Doha", "Qatar"),
    ("SIN", "Changi Airport", "Singapore", "Singapore"),
    ("FRA", "Frankfurt Intl", "Frankfurt", "Germany"),
    ("LHR", "London Heathrow", "London", "UK"),
    ("JFK", "New York JFK", "New York", "USA"),
    ("HND", "Tokyo Haneda", "Tokyo", "Japan"),
    ("SYD", "Sydney Airport", "Sydney", "Australia"),
    ("CDG", "Paris CDG", "Paris", "France"),
    ("YYZ", "Toronto Pearson", "Toronto", "Canada"),
]

airports = [Airport.objects.create(code=a, name=b, city=c, country=d) for a, b, c, d in airport_data]
print(f"✔ {len(airports)} airports created.\n")


# ---------------------------------------
# FLIGHTS + FARES
# ---------------------------------------
print("🛫 Creating flights...\n")

aircraft_list = ["Airbus A320", "A321neo", "Boeing 737", "Boeing 787", "A350"]

flight_count = 0

days_to_generate = 60  # create flights for next 60 days
flights_per_day_per_route = 5  # 5 flights per day


for day in range(days_to_generate):
    for _ in range(20):  # 20 different route pairs per day
        airline = random.choice(airlines)
        source, destination = random.sample(airports, 2)

        for i in range(flights_per_day_per_route):
            dep_time = datetime.now() + timedelta(days=day, hours=random.randint(0, 23))
            arr_time = dep_time + timedelta(hours=random.randint(2, 10))

            base_price = random.randint(2500, 20000)

            flight = Flight.objects.create(
                airline=airline,
                flight_number=f"{airline.code}{random.randint(100,999)}",
                source=source,
                destination=destination,
                departure_time=dep_time,
                arrival_time=arr_time,
                base_price=base_price,
                aircraft=random.choice(aircraft_list)
            )

            # Create fares
            for cabin in CabinClass.values:
                Fare.objects.create(
                    flight=flight,
                    cabin_class=cabin,
                    total_seats=150,
                    seats_available=random.randint(10, 150),
                    multiplier=random.uniform(1.0, 2.0)
                )

            flight_count += 1

print(f"✔ {flight_count} flights created successfully.\n")


# ---------------------------------------
# COUPONS
# ---------------------------------------
print("🎟 Creating coupons...")

Coupon.objects.create(
    code="WELCOME10",
    description="10% off for new users",
    discount_percent=10,
    active=True
)

Coupon.objects.create(
    code="SUMMER20",
    description="Summer sale 20% off",
    discount_percent=20,
    active=True
)

Coupon.objects.create(
    code="BUSINESS5",
    description="5% off Business class",
    discount_percent=5,
    active=True
)

print("✔ Coupons created.\n")

print("🎉 DATABASE SEEDING DONE! 🎉")

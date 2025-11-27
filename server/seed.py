import os
import django
import random
from datetime import datetime, timedelta

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from flights.models import Airport, Airline, Flight, Fare

print("Clearing old data...")
Fare.objects.all().delete()
Flight.objects.all().delete()
Airport.objects.all().delete()
Airline.objects.all().delete()

print("Seeding new global dataset...")

# ---------------------------
# CREATE AIRPORTS
# ---------------------------

airports_data = {
    "BOM": ("Mumbai", "India"),
    "DEL": ("Delhi", "India"),
    "MAA": ("Chennai", "India"),
    "BLR": ("Bangalore", "India"),
    "HYD": ("Hyderabad", "India"),
    "CCU": ("Kolkata", "India"),
    "DXB": ("Dubai", "UAE"),
    "DOH": ("Doha", "Qatar"),
    "AUH": ("Abu Dhabi", "UAE"),
    "SIN": ("Singapore", "Singapore"),
    "BKK": ("Bangkok", "Thailand"),
    "KUL": ("Kuala Lumpur", "Malaysia"),
    "HKG": ("Hong Kong", "China"),
    "LHR": ("London", "UK"),
    "FRA": ("Frankfurt", "Germany"),
    "CDG": ("Paris", "France"),
    "JFK": ("New York JFK", "USA"),
    "SFO": ("San Francisco", "USA"),
    "LAX": ("Los Angeles", "USA"),
}

airport_objs = {}

for code, (city, country) in airports_data.items():
    airport_objs[code] = Airport.objects.create(
        code=code,
        name=f"{city} Intl Airport",
        city=city,
        country=country
    )

print(f"{len(airport_objs)} airports added")

# ---------------------------
# CREATE AIRLINES
# ---------------------------

airlines_data = {
    "AI": "Air India",
    "6E": "Indigo",
    "EK": "Emirates",
    "QR": "Qatar Airways",
    "SQ": "Singapore Airlines",
    "LH": "Lufthansa",
    "AF": "Air France",
    "BA": "British Airways",
    "UA": "United Airlines",
    "AA": "American Airlines",
}

airline_objs = {}

for code, name in airlines_data.items():
    airline_objs[code] = Airline.objects.create(code=code, name=name)

print(f"{len(airline_objs)} airlines added")

# ---------------------------
# ROUTES
# ---------------------------

routes = [
    ("BOM", "DEL"), ("DEL", "BLR"), ("BLR", "HYD"), ("CCU", "BOM"),
    ("MAA", "DEL"), ("DEL", "CCU"), ("HYD", "BLR"),
    ("BOM", "DXB"), ("DEL", "DOH"), ("BLR", "AUH"),
    ("DEL", "SIN"), ("BOM", "BKK"), ("MAA", "KUL"), ("HYD", "HKG"),
    ("DEL", "LHR"), ("BOM", "FRA"), ("DEL", "CDG"),
    ("DEL", "JFK"), ("BOM", "SFO"), ("DEL", "LAX")
]

aircraft_types = ["A320", "A321neo", "B737", "A350", "B787", "B777", "A380"]

start_date = datetime(2025, 11, 28)
days = 10

all_flights = []
flight_number = 500

print("Generating flights...")

for day in range(days):
    for src, dst in routes:

        airline = random.choice(list(airline_objs.values()))
        aircraft = random.choice(aircraft_types)

        for _ in range(random.randint(2, 3)):
            dep_time = start_date + timedelta(days=day, hours=random.randint(5, 22))
            arr_time = dep_time + timedelta(hours=random.randint(2, 16))

            base_price = random.randint(4000, 35000)

            flight = Flight.objects.create(
                airline=airline,
                flight_number=f"{airline.code}{flight_number}",
                source=airport_objs[src],
                destination=airport_objs[dst],
                departure_time=dep_time,
                arrival_time=arr_time,
                base_price=base_price,
                aircraft=aircraft,
            )

            all_flights.append(flight)
            flight_number += 1

print(f"{len(all_flights)} flights created")

# ---------------------------
# FARES
# ---------------------------

fare_classes = [
    ("ECONOMY", 1.0),
    ("PREMIUM", 1.25),
    ("BUSINESS", 2.2),
    ("FIRST", 4.0),
]

fare_count = 0

for flight in all_flights:
    for cabin, mult in fare_classes:
        Fare.objects.create(
            flight=flight,
            cabin_class=cabin,
            total_seats=100,
            seats_available=random.randint(10, 70),
            multiplier=mult,
        )
        fare_count += 1

print(f"{fare_count} fares created")

print("Seeding completed successfully.")

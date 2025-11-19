from django.contrib import admin
from .models import Airport, Airline, Flight, Fare, Coupon

# -----------------------------
# Airport Admin
# -----------------------------
@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    list_display = ("code", "city", "country")
    search_fields = ("code", "city", "country")
    list_filter = ("country",)


# -----------------------------
# Airline Admin
# -----------------------------
@admin.register(Airline)
class AirlineAdmin(admin.ModelAdmin):
    list_display = ("code", "name")
    search_fields = ("code", "name")


# -----------------------------
# Fare Inline (for Flight Admin)
# -----------------------------
class FareInline(admin.TabularInline):
    model = Fare
    extra = 1
    fields = ("cabin_class", "total_seats", "seats_available", "multiplier")


# -----------------------------
# Flight Admin
# -----------------------------
@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = (
        "flight_number",
        "airline",
        "source",
        "destination",
        "departure_time",
        "arrival_time",
        "base_price",
        "aircraft",
    )
    search_fields = ("flight_number", "airline__name", "source__code", "destination__code")
    list_filter = ("airline", "source", "destination")
    inlines = [FareInline]


# -----------------------------
# Coupon Admin
# -----------------------------
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ("code", "discount_percent", "active", "valid_till")
    search_fields = ("code",)
    list_filter = ("active",)

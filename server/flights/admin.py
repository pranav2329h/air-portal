from django.contrib import admin
from .models import Airport, Airline, Flight, Fare, Coupon
admin.site.register([Airport, Airline, Flight, Fare, Coupon])

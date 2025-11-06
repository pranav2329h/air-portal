from rest_framework import serializers
from .models import Airport, Airline, Flight, Fare, Coupon

class AirportSerializer(serializers.ModelSerializer):
    class Meta: model = Airport; fields = "__all__"

class AirlineSerializer(serializers.ModelSerializer):
    class Meta: model = Airline; fields = "__all__"

class FareSerializer(serializers.ModelSerializer):
    class Meta: model = Fare; fields = ["id","cabin_class","total_seats","seats_available","multiplier"]

class FlightSerializer(serializers.ModelSerializer):
    airline = AirlineSerializer()
    source = AirportSerializer()
    destination = AirportSerializer()
    fares = FareSerializer(many=True)
    class Meta:
        model = Flight
        fields = ["id","airline","flight_number","source","destination",
                  "departure_time","arrival_time","aircraft","base_price","fares"]

class CouponSerializer(serializers.ModelSerializer):
    class Meta: model = Coupon; fields = "__all__"


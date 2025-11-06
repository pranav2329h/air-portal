from rest_framework import serializers
from .models import Booking, Passenger
from flights.models import Fare, Coupon, CabinClass
from decimal import Decimal
from .utils import generate_pnr

class PassengerSerializer(serializers.ModelSerializer):
    class Meta: model = Passenger; fields = ["id","first_name","last_name","age","passport_id"]

class BookingCreateSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True)
    coupon_code = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Booking
        fields = ["flight","cabin_class","passengers","coupon_code"]

    def validate(self, data):
        # check fare availability
        fare = Fare.objects.select_for_update().get(flight=data["flight"], cabin_class=data["cabin_class"])
        if fare.seats_available < len(data["passengers"]):
            raise serializers.ValidationError("Not enough seats available for this class.")
        return data

    def create(self, validated):
        passengers_data = validated.pop("passengers")
        coupon_code = validated.pop("coupon_code", "").strip()
        request = self.context["request"]

        # price = base * multiplier * count (simple demo)
        fare = Fare.objects.select_for_update().get(flight=validated["flight"], cabin_class=validated["cabin_class"])
        count = len(passengers_data)
        price = Decimal(validated["flight"].base_price) * Decimal(fare.multiplier) * count

        coupon = None
        if coupon_code:
            from flights.models import Coupon
            coupon = Coupon.objects.filter(code__iexact=coupon_code, active=True).first()
            if coupon:
                price = price * Decimal(100 - coupon.discount_percent) / Decimal(100)

        booking = Booking.objects.create(
            user=request.user, price_total=price, coupon=coupon, pnr=generate_pnr(), **validated
        )

        # create passengers & decrement seats
        for p in passengers_data:
            ps = Passenger.objects.create(**p)
            booking.passengers.add(ps)
        fare.seats_available -= count
        fare.save()

        return booking

class BookingSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True, read_only=True)
    class Meta:
        model = Booking
        fields = ["id","pnr","status","price_total","cabin_class","flight","passengers","created_at"]
        depth = 2

import django_filters as df
from .models import Flight

class FlightFilter(df.FilterSet):
    source = df.CharFilter(field_name="source__code", lookup_expr="iexact")
    destination = df.CharFilter(field_name="destination__code", lookup_expr="iexact")
    date = df.DateFilter(field_name="departure_time", lookup_expr="date")
    class Meta:
        model = Flight
        fields = ["source","destination","date"]

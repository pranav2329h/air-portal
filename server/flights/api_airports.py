from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Airport
from .serializers import AirportSerializer

class AirportListView(APIView):
    def get(self, request):
        q = request.GET.get("q", "")
        airports = Airport.objects.filter(code__icontains=q)[:10]
        return Response(AirportSerializer(airports, many=True).data)

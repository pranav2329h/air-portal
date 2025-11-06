from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from bookings.models import Booking, BookingStatus

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def pay(request):
    # demo only: mark booking as CONFIRMED
    booking_id = request.data.get("booking_id")
    try:
        b = Booking.objects.get(id=booking_id, user=request.user)
        b.status = BookingStatus.CONFIRMED
        b.save()
        return Response({"ok": True, "message":"Payment successful. Booking confirmed.", "pnr": b.pnr})
    except Booking.DoesNotExist:
        return Response({"ok": False, "message":"Booking not found."}, status=404)

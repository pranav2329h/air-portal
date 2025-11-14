import { useEffect, useState } from "react";
import { myBookings } from "../api/bookings";

export default function MyBookings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    myBookings().then((res) => setItems(res.data));
  }, []);

  return (
    <div className="app-container">
      <h2 className="page-title">My Bookings</h2>

      {items.length === 0 && (
        <div className="card mt-md">
          <p className="page-subtitle">You have no bookings yet.</p>
        </div>
      )}

      {items.map((booking) => (
        <div key={booking.id} className="card mt-md">
          <div className="section-title">PNR: {booking.pnr}</div>

          <div className="page-subtitle">
            {booking.flight.airline.name} {booking.flight.flight_number} •{" "}
            {booking.cabin_class}
          </div>

          <div className="mt-md">
            <strong>Passengers:</strong>
            <div>
              {booking.passengers.map((p) => (
                <div key={p.id}>
                  {p.first_name} {p.last_name} ({p.age})
                </div>
              ))}
            </div>
          </div>

          <div className="mt-md">
            <strong>Total Paid:</strong> ₹{booking.price_total}
          </div>

          <div className="mt-md badge">{booking.status}</div>
        </div>
      ))}
    </div>
  );
}

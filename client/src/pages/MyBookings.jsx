// src/pages/MyBookings.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listBookings } from "../api/bookings";

export default function MyBookings() {
  const user = useSelector((s) => s.auth.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await listBookings(user.id);
      setBookings(res.data);
    }
    if (user) load();
  }, [user]);

  return (
    <div className="app-container">
      <h2 className="page-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="page-subtitle">No bookings yet.</p>
      ) : (
        <div className="flights-list">
          {bookings.map((b) => (
            <div key={b.id} className="card">
              <h3 className="card-title">
                {b.flight.airline.name} {b.flight.flight_number} –{" "}
                {b.flight.source.code} → {b.flight.destination.code}
              </h3>
              <p className="card-subtitle">
                {b.fare.cabin_class} • ₹{Number(b.totalPrice).toFixed(0)} •{" "}
                {b.passengers[0]?.first_name} {b.passengers[0]?.last_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

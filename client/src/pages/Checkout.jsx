// src/pages/Checkout.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createBooking } from "../api/bookings";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  if (!state || !state.flight || !state.fare) {
    navigate("/home");
  }

  const { flight, fare } = state || {};
  const base = Number(flight.base_price || 0);
  const price = base * Number(fare.multiplier || 1);

  const [passenger, setPassenger] = useState({
    first_name: "",
    last_name: "",
    age: "",
    passport_id: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await createBooking({
      userId: user.id,
      flight,
      fare,
      passengers: [passenger],
      totalPrice: price,
    });
    navigate("/bookings");
  };

  return (
    <div className="app-container">
      <h2 className="page-title">Checkout</h2>

      <div className="card">
        <h3 className="card-title">
          {flight.airline.name} {flight.flight_number} – {flight.source.code} →{" "}
          {flight.destination.code}
        </h3>
        <p className="card-subtitle">
          Cabin: {fare.cabin_class} • Price: ₹{price.toFixed(0)}
        </p>

        <form className="mt-md" onSubmit={onSubmit}>
          <div className="grid grid-2">
            <input
              className="input"
              placeholder="First Name"
              value={passenger.first_name}
              onChange={(e) =>
                setPassenger((p) => ({ ...p, first_name: e.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Last Name"
              value={passenger.last_name}
              onChange={(e) =>
                setPassenger((p) => ({ ...p, last_name: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-2 mt-md">
            <input
              className="input"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) =>
                setPassenger((p) => ({ ...p, age: e.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Passport ID"
              value={passenger.passport_id}
              onChange={(e) =>
                setPassenger((p) => ({ ...p, passport_id: e.target.value }))
              }
            />
          </div>

          <button className="btn-primary mt-lg" type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

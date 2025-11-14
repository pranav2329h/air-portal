import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../api/bookings";
import { makePayment } from "../api/payments";
import { checkCoupon } from "../api/flights";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([
    { first_name: "", last_name: "", age: 18, passport_id: "" },
  ]);

  const [coupon, setCoupon] = useState("");
  const [couponInfo, setCouponInfo] = useState(null);

  const [booking, setBooking] = useState(null);

  if (!state) return <div className="app-container">Invalid navigation.</div>;

  const { flight, fare } = state;

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      { first_name: "", last_name: "", age: 18, passport_id: "" },
    ]);
  };

  const verifyCoupon = async () => {
    try {
      const res = await checkCoupon(coupon);
      setCouponInfo(res.data);
    } catch {
      setCouponInfo(null);
    }
  };

  const handleBooking = async () => {
    const payload = {
      flight: flight.id,
      cabin_class: fare.cabin_class,
      passengers,
      coupon_code: coupon || "",
    };

    const res = await createBooking(payload);
    setBooking(res.data);
  };

  const handlePayment = async () => {
    await makePayment(booking.id);
    alert(`Booking confirmed! PNR: ${booking.pnr}`);
    navigate("/bookings");
  };

  return (
    <div className="app-container">
      {/* Flight Summary */}
      <div className="card">
        <div className="section-title">Review</div>
        <div>
          {flight.airline.name} {flight.flight_number} — {fare.cabin_class}
        </div>
        <div className="badge mt-md">Flight ID: {flight.id}</div>
      </div>

      {/* Passenger Info */}
      <div className="card section">
        <div className="section-title">Passenger Details</div>

        {passengers.map((p, index) => (
          <div key={index} className="passenger-row">
            <input
              className="input"
              placeholder="First Name"
              value={p.first_name}
              onChange={(e) =>
                setPassengers((arr) => {
                  arr = [...arr];
                  arr[index].first_name = e.target.value;
                  return arr;
                })
              }
            />
            <input
              className="input"
              placeholder="Last Name"
              value={p.last_name}
              onChange={(e) =>
                setPassengers((arr) => {
                  arr = [...arr];
                  arr[index].last_name = e.target.value;
                  return arr;
                })
              }
            />
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) =>
                setPassengers((arr) => {
                  arr = [...arr];
                  arr[index].age = e.target.value;
                  return arr;
                })
              }
            />
            <input
              className="input"
              placeholder="Passport ID"
              value={p.passport_id}
              onChange={(e) =>
                setPassengers((arr) => {
                  arr = [...arr];
                  arr[index].passport_id = e.target.value;
                  return arr;
                })
              }
            />
          </div>
        ))}

        <button className="btn-ghost mt-md" onClick={addPassenger}>
          + Add Passenger
        </button>
      </div>

      {/* Coupon */}
      <div className="card section">
        <div className="section-title">Apply Coupon</div>

        <div className="passenger-row">
          <input
            className="input"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          />
          <button className="btn-primary" onClick={verifyCoupon}>
            Verify
          </button>
        </div>

        {couponInfo && (
          <div className="badge mt-md">
            Valid Coupon: {couponInfo.discount_percent}% off
          </div>
        )}
      </div>

      {/* Book Button */}
      {!booking && (
        <button className="btn-primary mt-lg" onClick={handleBooking}>
          Book Flight
        </button>
      )}

      {/* Payment */}
      {booking && (
        <div className="card section">
          <div className="section-title">Booking Created</div>
          <div className="badge">PNR: {booking.pnr}</div>

          <button className="btn-primary mt-md" onClick={handlePayment}>
            Pay & Confirm
          </button>
        </div>
      )}
    </div>
  );
}

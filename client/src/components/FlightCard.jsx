// src/components/FlightCard.jsx
import { format } from "date-fns";

export default function FlightCard({ flight, onSelect }) {
  const dep = format(new Date(flight.departure_time), "dd MMM, HH:mm");
  const arr = format(new Date(flight.arrival_time), "dd MMM, HH:mm");

  const base = Number(flight.base_price || 0);

  return (
    <div className="flight-card">
      <div className="flight-main">
        <div className="flight-title">
          {flight.airline.name} • {flight.flight_number} • {flight.aircraft}
        </div>
        <div className="flight-route">
          {flight.source.code} → {flight.destination.code}
        </div>
        <div className="flight-times">
          {dep} → {arr}
        </div>
      </div>

      <div className="fares-row">
        {flight.fares.map((fare) => {
          const price = base * Number(fare.multiplier || 1);
          return (
            <button
              key={fare.id}
              className="fare-chip"
              onClick={() => onSelect({ flight, fare })}
            >
              <div className="fare-chip-class">{fare.cabin_class}</div>
              <div className="fare-chip-price">₹{price.toFixed(0)}</div>
              <div className="fare-chip-meta">
                {fare.seats_available} seats left
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

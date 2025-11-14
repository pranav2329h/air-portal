import { format } from "date-fns";

export default function FlightCard({ flight, onSelect }) {
  const dep = format(new Date(flight.departure_time), "dd MMM, HH:mm");
  const arr = format(new Date(flight.arrival_time), "dd MMM, HH:mm");

  return (
    <div className="flight-card">
      {/* LEFT SIDE: FLIGHT INFO */}
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

      {/* RIGHT SIDE: CLASS OPTIONS */}
      <div className="fares-row">
        {flight.fares.map((fare) => (
          <button
            key={fare.id}
            className="fare-chip"
            onClick={() => onSelect({ flight, fare })}
          >
            {fare.cabin_class} • left {fare.seats_available}
          </button>
        ))}
      </div>
    </div>
  );
}

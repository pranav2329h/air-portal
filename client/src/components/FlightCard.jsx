import { format, differenceInMinutes } from "date-fns";

export default function FlightCard({ flight, onSelect }) {
  const depDate = new Date(flight.departure_time);
  const arrDate = new Date(flight.arrival_time);

  const dep = format(depDate, "dd MMM, HH:mm");
  const arr = format(arrDate, "dd MMM, HH:mm");

  const durationMin = differenceInMinutes(arrDate, depDate);
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  const durationLabel = `${hours}h ${minutes}m`;

  const computePrice = (fare) => {
    const base = Number(flight.base_price || 0);
    const mult = Number(fare.multiplier || 1);
    return Math.round(base * mult).toLocaleString("en-IN");
  };

  return (
    <div className="flight-card">
      {/* Left side */}
      <div className="flight-main">
        <div className="flight-airline">
          <span className="airline-name">{flight.airline.name}</span>
          <span className="flight-number">
            {flight.airline.code}-{flight.flight_number}
          </span>
        </div>

        <div className="flight-route">
          <div className="airport">
            <div className="airport-code">{flight.source.code}</div>
            <div className="airport-city">{flight.source.city}</div>
            <div className="airport-time">{dep}</div>
          </div>

          <div className="route-center">
            <div className="route-line" />
            <div className="route-duration">{durationLabel}</div>
          </div>

          <div className="airport">
            <div className="airport-code">{flight.destination.code}</div>
            <div className="airport-city">{flight.destination.city}</div>
            <div className="airport-time">{arr}</div>
          </div>
        </div>

        <div className="flight-meta">
          <span>{flight.aircraft}</span>
        </div>
      </div>

      {/* Right side: fares */}
      <div className="flight-fares">
        {flight.fares.map((fare) => (
          <button
            key={fare.id}
            className="fare-card"
            onClick={() => onSelect({ flight, fare })}
          >
            <div className="fare-class">{fare.cabin_class}</div>
            <div className="fare-price">₹ {computePrice(fare)}</div>
            <div className="fare-seats">
              {fare.seats_available > 5
                ? `${fare.seats_available} seats left`
                : `Only ${fare.seats_available} left`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

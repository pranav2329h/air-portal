import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchFlights } from "../api/flights";
import FlightCard from "../components/FlightCard";

export default function SearchResults() {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasParams =
    params.source && params.destination && params.date;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = hasParams ? params : {};

    searchFlights(query)
      .then((res) => setFlights(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load flights. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [search]);

  const title = hasParams
    ? `Flights ${params.source} → ${params.destination} on ${params.date}`
    : "All Available Flights";

  return (
    <div className="app-container">
      <h2 className="page-title">{title}</h2>

      {loading && (
        <div className="card">
          <p>Loading flights...</p>
        </div>
      )}

      {error && (
        <div className="card error-card">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && flights.length === 0 && (
        <div className="card">
          <p>No flights available for this search.</p>
        </div>
      )}

      <div className="flights-list">
        {flights.map((f) => (
          <FlightCard
            key={f.id}
            flight={f}
            onSelect={({ flight, fare }) =>
              // parent Checkout logic stays same
              window.location.assign(
                `/checkout?flight=${flight.id}&fare=${fare.id}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

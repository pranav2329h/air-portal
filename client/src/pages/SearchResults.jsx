import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchFlights } from "../api/flights";
import FlightCard from "../components/FlightCard";

export default function SearchResults() {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));

  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    searchFlights(params).then((res) => setFlights(res.data));
  }, [search]);

  const onSelect = ({ flight, fare }) => {
    navigate("/checkout", {
      state: { flight, fare },
    });
  };

  return (
    <div className="app-container">
      <h2 className="page-title" style={{ fontSize: "1.5rem" }}>Search Results</h2>

      <div className="flights-list">
        {flights.length > 0 ? (
          flights.map((f) => (
            <FlightCard key={f.id} flight={f} onSelect={onSelect} />
          ))
        ) : (
          <div className="card">
            <p className="page-subtitle">No flights available for this search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

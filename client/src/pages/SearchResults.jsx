// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchFlights } from "../api/flights";
import FlightCard from "../components/FlightCard";

export default function SearchResults() {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await searchFlights(params); // if no params => all flights
        setFlights(res.data);
      } catch (e) {
        console.error(e);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search]);

  const onSelect = ({ flight, fare }) => {
    navigate("/checkout", { state: { flight, fare } });
  };

  return (
    <div className="app-container">
      <h2 className="page-title">Search Results</h2>

      {loading ? (
        <p className="page-subtitle">Loading flights...</p>
      ) : flights.length > 0 ? (
        <div className="flights-list">
          {flights.map((f) => (
            <FlightCard key={f.id} flight={f} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="card">
          <p className="page-subtitle">
            No flights available. Try another route or date.
          </p>
        </div>
      )}
    </div>
  );
}

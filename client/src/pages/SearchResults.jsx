import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchFlights } from "../api/flights";
import FlightCard from "../components/FlightCard";

export default function SearchResults() {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the required params exist
    if (!params.source || !params.destination || !params.date) {
      console.warn("Missing search params:", params);
      setFlights([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    searchFlights(params)
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.error("Flight search error:", err);
        setFlights([]);
      })
      .finally(() => setLoading(false));
  }, [search]); // THIS IS OK NOW

  const onSelect = ({ flight, fare }) => {
    navigate("/checkout", { state: { flight, fare } });
  };

  return (
    <div className="app-container">
      <h2 className="page-title" style={{ fontSize: "1.5rem" }}>
        Search Results
      </h2>

      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <div className="flights-list">
          {flights.map((f) => (
            <FlightCard key={f.id} flight={f} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="card">
          <p className="page-subtitle">No flights available for this search.</p>
        </div>
      )}
    </div>
  );
}

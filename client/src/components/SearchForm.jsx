// src/components/SearchForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIRPORTS = [
  { code: "BOM", city: "Mumbai", name: "Mumbai Intl" },
  { code: "DEL", city: "Delhi", name: "Delhi Intl" },
  { code: "BLR", city: "Bangalore", name: "Bangalore Intl" },
  { code: "HYD", city: "Hyderabad", name: "Hyderabad Intl" },
  { code: "MAA", city: "Chennai", name: "Chennai Airport" },
  { code: "CCU", city: "Kolkata", name: "Kolkata Airport" },
  { code: "DXB", city: "Dubai", name: "Dubai Intl" },
  { code: "DOH", city: "Doha", name: "Doha Intl" },
  { code: "SIN", city: "Singapore", name: "Changi Airport" },
];

export default function SearchForm() {
  const today = new Date().toISOString().split("T")[0];

  const [source, setSource] = useState("BOM");
  const [destination, setDestination] = useState("DEL");
  const [date, setDate] = useState(today);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const navigate = useNavigate();

  const onSearch = () => {
    navigate(
      `/search?source=${source}&destination=${destination}&date=${date}`
    );
  };

  const filterAirports = (q) => {
    const query = q.toLowerCase();
    if (!query) return [];
    return AIRPORTS.filter(
      (a) =>
        a.code.toLowerCase().includes(query) ||
        a.city.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query)
    ).slice(0, 6);
  };

  const fromSuggestions = filterAirports(fromQuery);
  const toSuggestions = filterAirports(toQuery);

  return (
    <div className="card">
      <div className="search-form">
        {/* FROM */}
        <div className="field-group">
          <label className="field-label">From</label>
          <input
            className="input"
            placeholder="Search city or airport"
            value={fromQuery}
            onChange={(e) => setFromQuery(e.target.value)}
          />
          {fromSuggestions.length > 0 && (
            <div className="suggestion-box">
              {fromSuggestions.map((a) => (
                <div
                  key={a.code}
                  className="suggestion-item"
                  onClick={() => {
                    setSource(a.code);
                    setFromQuery(`${a.city} (${a.code})`);
                  }}
                >
                  <strong>{a.city}</strong> – {a.name} ({a.code})
                </div>
              ))}
            </div>
          )}
          <small className="hint">Selected: {source}</small>
        </div>

        {/* TO */}
        <div className="field-group">
          <label className="field-label">To</label>
          <input
            className="input"
            placeholder="Search city or airport"
            value={toQuery}
            onChange={(e) => setToQuery(e.target.value)}
          />
          {toSuggestions.length > 0 && (
            <div className="suggestion-box">
              {toSuggestions.map((a) => (
                <div
                  key={a.code}
                  className="suggestion-item"
                  onClick={() => {
                    setDestination(a.code);
                    setToQuery(`${a.city} (${a.code})`);
                  }}
                >
                  <strong>{a.city}</strong> – {a.name} ({a.code})
                </div>
              ))}
            </div>
          )}
          <small className="hint">Selected: {destination}</small>
        </div>

        {/* DATE */}
        <div className="field-group">
          <label className="field-label">Departure Date</label>
          <input
            className="input"
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <button className="btn-primary" onClick={onSearch}>
          Search Flights
        </button>
      </div>
    </div>
  );
}

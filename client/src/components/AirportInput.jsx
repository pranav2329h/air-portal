import { useState, useEffect } from "react";
import { searchAirports } from "../api/airports";

export default function AirportInput({ label, value, onChange }) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await searchAirports(query);
      setResults(res.data);
      setShow(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  const selectAirport = (airport) => {
    onChange(airport.code);
    setQuery(airport.code);
    setShow(false);
  };

  return (
    <div className="airport-box">
      <label className="field-label">{label}</label>

      <input
        className="input"
        value={query}
        placeholder="Type airport or city"
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setShow(true)}
      />

      {show && results.length > 0 && (
        <div className="dropdown">
          {results.map((a) => (
            <div
              key={a.id}
              className="dropdown-item"
              onClick={() => selectAirport(a)}
            >
              <strong>{a.code}</strong> — {a.city}, {a.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

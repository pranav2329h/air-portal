import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function SearchForm() {
  const [airports, setAirports] = useState([]);
  const [filteredSource, setFilteredSource] = useState([]);
  const [filteredDestination, setFilteredDestination] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  // Fetch airport list
  useEffect(() => {
    http.get("/flights/airports/").then((res) => {
      setAirports(res.data);
    });
  }, []);

  // Filter source airports
  const handleSourceChange = (value) => {
    setSource(value);
    if (value.length > 0) {
      setFilteredSource(
        airports.filter(
          (a) =>
            a.code.toLowerCase().includes(value.toLowerCase()) ||
            a.city.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSource([]);
    }
  };

  // Filter destination airports
  const handleDestinationChange = (value) => {
    setDestination(value);
    if (value.length > 0) {
      setFilteredDestination(
        airports.filter(
          (a) =>
            a.code.toLowerCase().includes(value.toLowerCase()) ||
            a.city.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredDestination([]);
    }
  };

  const onSearch = () => {
    navigate(
      `/search?source=${source}&destination=${destination}&date=${date}`
    );
  };

  return (
    <div className="card">
      <div className="search-form">

        {/* SOURCE */}
        <div className="field-group" style={{ position: "relative" }}>
          <label className="field-label">From</label>
          <input
            className="input"
            placeholder="Type city or airport"
            value={source}
            onChange={(e) => handleSourceChange(e.target.value)}
          />

          {filteredSource.length > 0 && (
            <div className="dropdown-menu">
              {filteredSource.map((a) => (
                <div
                  key={a.code}
                  className="dropdown-item"
                  onClick={() => {
                    setSource(a.code);
                    setFilteredSource([]);
                  }}
                >
                  {a.city} ({a.code}) – {a.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESTINATION */}
        <div className="field-group" style={{ position: "relative" }}>
          <label className="field-label">To</label>
          <input
            className="input"
            placeholder="Type city or airport"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
          />

          {filteredDestination.length > 0 && (
            <div className="dropdown-menu">
              {filteredDestination.map((a) => (
                <div
                  key={a.code}
                  className="dropdown-item"
                  onClick={() => {
                    setDestination(a.code);
                    setFilteredDestination([]);
                  }}
                >
                  {a.city} ({a.code}) – {a.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DATE */}
        <div className="field-group">
          <label className="field-label">Departure Date</label>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* SEARCH BUTTON */}
        <button className="btn-primary" onClick={onSearch}>
          Search Flights
        </button>
      </div>
    </div>
  );
}

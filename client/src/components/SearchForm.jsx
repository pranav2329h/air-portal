import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { getAirports } from "../api/flights";

export default function SearchForm() {
  const navigate = useNavigate();

  const [airports, setAirports] = useState([]);
  const [source, setSource] = useState("BOM");
  const [destination, setDestination] = useState("DEL");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [activeField, setActiveField] = useState(null); // "source" | "destination" | null

  // Fetch airports once
  useEffect(() => {
    getAirports()
      .then((res) => setAirports(res.data))
      .catch((err) => console.error("Failed to load airports", err));
  }, []);

  const onSearch = () => {
    navigate(
      `/search?source=${source}&destination=${destination}&date=${date}`
    );
  };

  const onSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  const handleSelectAirport = (field, code) => {
    if (field === "source") setSource(code);
    if (field === "destination") setDestination(code);
    setActiveField(null);
  };

  const filteredAirports = (text) => {
    const q = text.toLowerCase();
    return airports.filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q)
    );
  };

  return (
    <div className="card search-card">
      <div className="search-form">

        {/* FROM */}
        <div className="field-group">
          <label className="field-label">
            <FaPlaneDeparture style={{ marginRight: 6 }} />
            From
          </label>
          <div className="input-with-dropdown">
            <input
              className="input"
              placeholder="City or airport"
              value={source}
              onFocus={() => setActiveField("source")}
              onChange={(e) => setSource(e.target.value.toUpperCase())}
            />
            {activeField === "source" && (
              <div className="dropdown-list">
                {filteredAirports(source).map((a) => (
                  <div
                    key={a.id}
                    className="dropdown-item"
                    onMouseDown={() => handleSelectAirport("source", a.code)}
                  >
                    <span className="dropdown-main">
                      {a.city} ({a.code})
                    </span>
                    <span className="dropdown-sub">{a.name}</span>
                  </div>
                ))}
                {filteredAirports(source).length === 0 && (
                  <div className="dropdown-empty">No matching airports</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SWITCH */}
        <button
          type="button"
          className="swap-btn"
          onClick={onSwap}
          title="Swap"
        >
          <FaExchangeAlt />
        </button>

        {/* TO */}
        <div className="field-group">
          <label className="field-label">
            <FaPlaneArrival style={{ marginRight: 6 }} />
            To
          </label>
          <div className="input-with-dropdown">
            <input
              className="input"
              placeholder="City or airport"
              value={destination}
              onFocus={() => setActiveField("destination")}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
            />
            {activeField === "destination" && (
              <div className="dropdown-list">
                {filteredAirports(destination).map((a) => (
                  <div
                    key={a.id}
                    className="dropdown-item"
                    onMouseDown={() =>
                      handleSelectAirport("destination", a.code)
                    }
                  >
                    <span className="dropdown-main">
                      {a.city} ({a.code})
                    </span>
                    <span className="dropdown-sub">{a.name}</span>
                  </div>
                ))}
                {filteredAirports(destination).length === 0 && (
                  <div className="dropdown-empty">No matching airports</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DATE */}
        <div className="field-group">
          <label className="field-label">Departure Date</label>
          <input
            className="input"
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button className="btn-primary search-btn" onClick={onSearch}>
          <FaSearch style={{ marginRight: 6 }} />
          Search Flights
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaExchangeAlt } from "react-icons/fa";

export default function SearchForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [airportList, setAirportList] = useState([]);
  const [filteredSource, setFilteredSource] = useState([]);
  const [filteredDestination, setFilteredDestination] = useState([]);

  const navigate = useNavigate();

  // Load airport list from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/flights/airports/")
      .then((res) => res.json())
      .then((data) => setAirportList(data));
  }, []);

  // Filter dropdown list
  const filterAirports = (text) => {
    if (!text) return [];
    return airportList.filter((a) =>
      a.code.toLowerCase().includes(text.toLowerCase()) ||
      a.city.toLowerCase().includes(text.toLowerCase()) ||
      a.name.toLowerCase().includes(text.toLowerCase())
    );
  };

  // Swap FROM & TO
  const swapAirports = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const onSearch = () => {
    if (!source || !destination || !date) {
      alert("Please select all fields");
      return;
    }

    navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
  };

  return (
    <div className="premium-search-card">

      <h2 className="search-title">Find Your Perfect Flight ✈️</h2>

      <div className="form-row">

        {/* FROM */}
        <div className="input-group">
          <label className="input-label">
            <FaPlaneDeparture className="icon" /> From
          </label>

          <input
            className="input-field"
            placeholder="Mumbai, BOM"
            value={source}
            onChange={(e) => {
              const v = e.target.value;
              setSource(v);
              setFilteredSource(filterAirports(v));
            }}
          />

          {/* Auto Suggest */}
          {filteredSource.length > 0 && (
            <div className="dropdown">
              {filteredSource.map((a) => (
                <div
                  key={a.code}
                  className="dropdown-item"
                  onClick={() => {
                    setSource(a.code);
                    setFilteredSource([]);
                  }}
                >
                  <strong>{a.code}</strong> — {a.city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SWAP BUTTON */}
        <button className="swap-btn" onClick={swapAirports}>
          <FaExchangeAlt />
        </button>

        {/* TO */}
        <div className="input-group">
          <label className="input-label">
            <FaPlaneArrival className="icon" /> To
          </label>

          <input
            className="input-field"
            placeholder="Delhi, DEL"
            value={destination}
            onChange={(e) => {
              const v = e.target.value;
              setDestination(v);
              setFilteredDestination(filterAirports(v));
            }}
          />

          {/* Auto Suggest */}
          {filteredDestination.length > 0 && (
            <div className="dropdown">
              {filteredDestination.map((a) => (
                <div
                  key={a.code}
                  className="dropdown-item"
                  onClick={() => {
                    setDestination(a.code);
                    setFilteredDestination([]);
                  }}
                >
                  <strong>{a.code}</strong> — {a.city}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* DATE */}
      <div className="input-group mt-lg">
        <label className="input-label">Departure Date</label>
        <input
          className="input-field"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* SEARCH BUTTON */}
      <button className="premium-search-btn" onClick={onSearch}>
        Search Flights ✈️
      </button>
    </div>
  );
}

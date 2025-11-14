import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [source, setSource] = useState("BOM");
  const [destination, setDestination] = useState("DEL");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const onSearch = () => {
    navigate(
      `/search?source=${source}&destination=${destination}&date=${date}`
    );
  };

  return (
    <div className="card">
      <div className="search-form">
        {/* SOURCE */}
        <div className="field-group">
          <label className="field-label">From</label>
          <input
            className="input"
            placeholder="BOM"
            value={source}
            onChange={(e) => setSource(e.target.value.toUpperCase())}
          />
        </div>

        {/* DESTINATION */}
        <div className="field-group">
          <label className="field-label">To</label>
          <input
            className="input"
            placeholder="DEL"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
          />
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

        {/* SUBMIT */}
        <button className="btn-primary" onClick={onSearch}>
          Search Flights
        </button>
      </div>
    </div>
  );
}

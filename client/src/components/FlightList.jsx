import { useEffect, useState } from "react";
import { api } from "../api";

export default function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    api.get("/flights/")
      .then((res) => {
        setFlights(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Flights</h1>
      {flights.map((f) => (
        <div key={f.id} className="flight-card">
          <h3>{f.airline.name} - {f.flight_number}</h3>
          <p>{f.source.city} → {f.destination.city}</p>
          <p>Depart: {new Date(f.departure_time).toLocaleString()}</p>
          <p>Price: ₹{f.base_price}</p>
        </div>
      ))}
    </div>
  );
}

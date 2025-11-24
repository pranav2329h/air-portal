import { format } from "date-fns";

export default function FlightCard({ flight, onSelect }) {
  const dep = new Date(flight.departure_time);
  const arr = new Date(flight.arrival_time);

  const depStr = format(dep, "dd MMM, HH:mm");
  const arrStr = format(arr, "dd MMM, HH:mm");

  // Calculate duration
  const diffMs = arr - dep;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  // Airline Logo (dynamic placeholder)
  const logoUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${flight.airline.code}`;

  return (
    <div
      className="premium-flight-card"
      style={{
        background: "rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "22px",
        padding: "24px",
        marginBottom: "26px",
        border: "1px solid rgba(255,255,255,0.25)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.35s",
        cursor: "pointer",
        boxShadow: "0 10px 32px rgba(0,0,0,0.15)",
      }}
    >
      {/* LEFT SECTION */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Airline Logo */}
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "14px",
            background: "#fff",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        />

        <div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "white",
              marginBottom: "4px",
              textTransform: "capitalize",
            }}
          >
            {flight.airline.name}
          </div>

          <div
            style={{
              fontSize: "1.45rem",
              fontWeight: 800,
              color: "#E5F0FF",
              marginBottom: "4px",
            }}
          >
            {flight.source.code} → {flight.destination.code}
          </div>

          <div style={{ color: "#d1e3ff", marginBottom: "5px" }}>
            🕒 {depStr} → {arrStr}
          </div>

          <div style={{ color: "#bcd2ff", fontSize: "0.85rem" }}>
            ⏳ Duration: {hours}h {minutes}m
          </div>

          <div style={{ color: "#bcd2ff", fontSize: "0.85rem", marginTop: "4px" }}>
            ✈ Aircraft: {flight.aircraft}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION – FARES */}
      <div
        className="fare-options"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        {flight.fares.map((fare) => {
          const price = Math.round(flight.base_price * fare.multiplier);

          return (
            <button
              key={fare.id}
              onClick={() => onSelect({ flight, fare })}
              style={{
                background: "linear-gradient(135deg, #0038ff, #00c4ff)",
                padding: "12px 18px",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
                minWidth: "170px",
                textAlign: "right",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                transition: "0.25s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.07)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              <div style={{ fontSize: "0.95rem" }}>
                {fare.cabin_class}
              </div>

              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  marginTop: "3px",
                }}
              >
                ₹{price}
              </div>

              <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                {fare.seats_available} seats left
              </div>
            </button>
          );
        })}

        {/* Best Price Tag */}
        <div
          style={{
            marginTop: "6px",
            padding: "6px 14px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.8rem",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          ⭐ Best Price Guaranteed
        </div>
      </div>
    </div>
  );
}

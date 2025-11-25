// client/src/pages/Register.jsx
import { useState } from "react";
import { register as apiRegister } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    mobile: "",
    passport_id: "",
  });

  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      setError("");
      await apiRegister(form);
      // after register we auto-logged in, go home
      navigate("/home");
    } catch (err) {
      setError(err?.message || "Registration failed");
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: 500 }}>
      <h2 className="page-title">Create Account</h2>
      <p className="page-subtitle">
        Sign up to search flights and manage your bookings.
      </p>

      <input
        className="input mt-md"
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        className="input mt-md"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="input mt-md"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {/* (optional) keep extra fields, they will be stored too */}
      {/* 
      <input ... first_name />
      <input ... last_name />
      <input ... mobile />
      <input ... passport_id />
      */}

      {error && (
        <div
          style={{
            marginTop: "0.75rem",
            color: "#b91c1c",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      <button className="btn-primary mt-md" onClick={onSubmit}>
        Create Account
      </button>

      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#4f46e5" }}>
          Login
        </Link>
      </div>
    </div>
  );
}

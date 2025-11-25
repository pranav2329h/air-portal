// client/src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await dispatch(loginThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: 450 }}>
      {/* Logo + title */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #4f46e5, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 0.75rem",
            color: "#fff",
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          AP
        </div>
        <h2 className="page-title">Welcome back to AirPortal</h2>
        <p className="page-subtitle">
          Sign in to search and manage your bookings.
        </p>
      </div>

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
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

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

      <button
        className="btn-primary mt-md"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link to="/register" style={{ color: "#4f46e5" }}>
          Create one
        </Link>
      </div>
    </div>
  );
}

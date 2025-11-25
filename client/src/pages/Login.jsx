// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ username: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="page-title">Welcome back to AirPortal</h2>
        <p className="page-subtitle">
          Sign in to search and manage your bookings.
        </p>

        <form onSubmit={onSubmit}>
          <input
            className="input mt-md"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
          />

          <input
            className="input mt-md"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />

          {error && <div className="error-text mt-sm">{error}</div>}

          <button className="btn-primary mt-lg" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-md auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="link">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

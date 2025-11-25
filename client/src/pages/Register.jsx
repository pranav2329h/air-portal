// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="page-title">Create your account</h2>
        <p className="page-subtitle">Book flights with a single login.</p>

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
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-md auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

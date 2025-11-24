import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    await dispatch(loginThunk(form));
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "999px",
              margin: "0 auto 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle at 0% 0%, #38bdf8, #4f46e5)",
              boxShadow: "0 18px 35px rgba(37, 99, 235, 0.7)",
              fontSize: 24,
            }}
          >
            ✈
          </div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to manage flights & bookings</p>
        </div>

        <input
          className="input mt-md"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="input mt-md"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn-primary mt-md" style={{ width: "100%" }} onClick={onSubmit}>
          Login
        </button>

        <div className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

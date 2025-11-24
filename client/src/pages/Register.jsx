import { useState } from "react";
import { register as apiRegister } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    await apiRegister({
      username: form.username,
      email: form.email,
      password: form.password,
    });
    navigate("/login");
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
                "radial-gradient(circle at 0% 0%, #22c55e, #4f46e5)",
              boxShadow: "0 18px 35px rgba(22, 163, 74, 0.7)",
              fontSize: 24,
            }}
          >
            🛫
          </div>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Book flights with a single login</p>
        </div>

        <input
          className="input mt-md"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="input mt-md"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input mt-md"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="btn-primary mt-md"
          style={{ width: "100%" }}
          onClick={onSubmit}
        >
          Create Account
        </button>

        <div className="auth-footer">
          Already registered?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

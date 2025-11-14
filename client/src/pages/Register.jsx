import { useState } from "react";
import { register as apiRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = async () => {
    await apiRegister(form);
    navigate("/login");
  };

  return (
    <div className="app-container" style={{ maxWidth: 500 }}>
      <h2 className="page-title">Create Account</h2>

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
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
      />

      <input
        className="input mt-md"
        placeholder="Last Name"
        value={form.last_name}
        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
      />

      <input
        className="input mt-md"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />

      <input
        className="input mt-md"
        placeholder="Passport ID"
        value={form.passport_id}
        onChange={(e) => setForm({ ...form, passport_id: e.target.value })}
      />

      <input
        className="input mt-md"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="btn-primary mt-md" onClick={onSubmit}>
        Create Account
      </button>
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    await dispatch(loginThunk(form));
    navigate("/profile");
  };

  return (
    <div className="app-container" style={{ maxWidth: 450 }}>
      <h2 className="page-title">Login</h2>

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

      <button className="btn-primary mt-md" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
}

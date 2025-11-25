// src/pages/Profile.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../api/auth";
import { logout } from "../store/authSlice";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    mobile: user.mobile || "",
    passport_id: user.passport_id || "",
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await updateProfile(form);
    setMessage("Profile updated!");
    // we don’t update redux here to keep code short,
    // but you can if you want.
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-container" style={{ maxWidth: 600 }}>
      <h2 className="page-title">My Profile</h2>

      <div className="card">
        <p className="card-subtitle">
          Logged in as <strong>{user.username}</strong> ({user.email})
        </p>

        <form className="mt-md" onSubmit={onSubmit}>
          <div className="grid grid-2">
            <input
              className="input"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, first_name: e.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, last_name: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-2 mt-md">
            <input
              className="input"
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) =>
                setForm((f) => ({ ...f, mobile: e.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Passport ID"
              value={form.passport_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, passport_id: e.target.value }))
              }
            />
          </div>

          <button className="btn-primary mt-lg" type="submit">
            Save Changes
          </button>

          {message && <div className="success-text mt-sm">{message}</div>}
        </form>

        <button className="nav-btn secondary mt-lg" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

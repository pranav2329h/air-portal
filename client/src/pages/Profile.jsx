import { useEffect, useState } from "react";
import http from "../api/http";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    http.get("/auth/me/").then(res => {
      setUser(res.data);
      setForm(res.data);
    });
  }, []);

  const updateProfile = () => {
    http.put("/auth/update/", form).then(() => {
      alert("Profile Updated!");
    });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <h2 className="page-title">My Profile</h2>

      <div className="card">
        <label>Mobile</label>
        <input className="input" value={form.mobile || ""} onChange={e => setForm({ ...form, mobile: e.target.value })} />

        <label>Passport ID</label>
        <input className="input" value={form.passport_id || ""} onChange={e => setForm({ ...form, passport_id: e.target.value })} />

        <label>Age</label>
        <input className="input" type="number" value={form.age || ""} onChange={e => setForm({ ...form, age: e.target.value })} />

        <label>Gender</label>
        <select className="input" value={form.gender || ""} onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Address</label>
        <textarea className="input" value={form.address || ""} onChange={e => setForm({ ...form, address: e.target.value })} />

        <label>Profile Image URL</label>
        <input className="input" value={form.profile_image || ""} onChange={e => setForm({ ...form, profile_image: e.target.value })} />

        <button className="btn-primary mt-md" onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

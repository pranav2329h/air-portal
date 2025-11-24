import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../api/auth";
import { setUser } from "../store/authSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    mobile: user?.mobile || "",
    passport_id: user?.passport_id || "",
    age: user?.age || "",
    gender: user?.gender || "",
    address: user?.address || "",
    profile_image: user?.profile_image || "",
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSave() {
    try {
      setSaving(true);
      const res = await updateProfile(form);

      dispatch(setUser({ ...user, ...form }));
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="profile-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
        minHeight: "100vh",
      }}
    >
      <div
        className="profile-card"
        style={{
          background: "white",
          padding: "35px",
          width: "480px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          animation: "fadeIn 0.5s ease",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              form.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="Profile"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #6366f1",
            }}
          />
          <h2 style={{ marginTop: "15px", fontWeight: "600" }}>
            {user?.username}
          </h2>
          <p style={{ color: "#6b7280" }}>{user?.email}</p>
        </div>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div
            style={{
              background: "#ecfdf5",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              marginBottom: "15px",
              color: "#059669",
              fontWeight: "500",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* FORM */}
        <div className="field">
          <label className="label">Mobile</label>
          <input
            className="input"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Passport ID</label>
          <input
            className="input"
            value={form.passport_id}
            onChange={(e) => setForm({ ...form, passport_id: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Gender</label>
          <select
            className="input"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Address</label>
          <textarea
            className="input"
            rows="2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Profile Image URL</label>
          <input
            className="input"
            value={form.profile_image}
            onChange={(e) =>
              setForm({ ...form, profile_image: e.target.value })
            }
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#6366f1",
            color: "white",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            border: "none",
            transition: "0.3s",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

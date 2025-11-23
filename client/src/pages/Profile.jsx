import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, me as fetchMe } from "../api/auth";
import { setUser } from "../store/authSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    mobile: user?.mobile || "",
    passport_id: user?.passport_id || "",
    age: user?.age || "",
    gender: user?.gender || "",
    address: user?.address || "",
    profile_image: user?.profile_image || "",
  });

  if (!user) {
    return (
      <div className="app-container">
        <div className="card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      await updateProfile(form);
      const meRes = await fetchMe();
      dispatch(setUser(meRes.data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const avatarLetter = user.username ? user.username[0].toUpperCase() : "?";

  return (
    <div className="app-container">
      {/* MAIN PROFILE CARD */}
      <div className="profile-layout">
        {/* LEFT: PROFILE SUMMARY */}
        <div className="profile-card main-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.profile_image ? (
                <img src={user.profile_image} alt="Avatar" />
              ) : (
                <span>{avatarLetter}</span>
              )}
            </div>
            <div className="profile-basic">
              <h2 className="profile-name">{user.username}</h2>
              <p className="profile-email">{user.email}</p>
              <p className="profile-role">AirPortal Traveler</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-label">Loyalty Points</div>
              <div className="stat-value">{user.loyalty_points ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Mobile</div>
              <div className="stat-value">{user.mobile || "Not added"}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Passport ID</div>
              <div className="stat-value">{user.passport_id || "Not added"}</div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
            <a href="/bookings" className="btn-secondary">
              View Bookings
            </a>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="profile-card details-card">
          <h3 className="section-title">Personal Details</h3>
          <div className="profile-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Age</span>
              <span className="detail-value">{user.age ?? "Not set"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">
                {user.gender || "Not set"}
              </span>
            </div>
            <div className="detail-item full">
              <span className="detail-label">Address</span>
              <span className="detail-value">
                {user.address || "Not set"}
              </span>
            </div>
          </div>

          <h3 className="section-title mt-lg">Travel Preferences</h3>
          <p className="muted">
            (You can later add meal preferences, seat preferences, etc.)
          </p>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit Profile</h2>

            {error && <div className="error-text">{error}</div>}

            <div className="modal-form">
              <div className="field-group">
                <label className="field-label">Mobile</label>
                <input
                  className="input"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="field-group">
                <label className="field-label">Passport ID</label>
                <input
                  className="input"
                  name="passport_id"
                  value={form.passport_id}
                  onChange={handleChange}
                  placeholder="Passport number"
                />
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Age</label>
                  <input
                    className="input"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Gender</label>
                  <select
                    className="input"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Address</label>
                <textarea
                  className="input"
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your full address"
                />
              </div>

              <div className="field-group">
                <label className="field-label">Profile Image URL</label>
                <input
                  className="input"
                  name="profile_image"
                  value={form.profile_image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getMe, updateProfile } from "../api/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe().then((res) => setProfile(res.data));
  }, []);

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    setSaving(true);
    updateProfile(profile)
      .then(() => {
        alert("Profile Updated Successfully!");
      })
      .finally(() => setSaving(false));
  };

  if (!profile) return <div className="app-container">Loading...</div>;

  return (
    <div className="app-container">
      <h2 className="page-title">My Profile</h2>

      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* PROFILE IMAGE */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              profile.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            style={{ width: "120px", borderRadius: "50%" }}
          />
        </div>

        {/* FORM */}
        <div className="form-grid">
          <input
            className="input"
            placeholder="First Name"
            name="first_name"
            value={profile.first_name || ""}
            onChange={onChange}
          />

          <input
            className="input"
            placeholder="Last Name"
            name="last_name"
            value={profile.last_name || ""}
            onChange={onChange}
          />

          <input
            className="input"
            placeholder="Mobile"
            name="mobile"
            value={profile.mobile || ""}
            onChange={onChange}
          />

          <input
            className="input"
            placeholder="Age"
            type="number"
            name="age"
            value={profile.age || ""}
            onChange={onChange}
          />

          <select
            className="input"
            name="gender"
            value={profile.gender || ""}
            onChange={onChange}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            className="input"
            placeholder="City"
            name="city"
            value={profile.city || ""}
            onChange={onChange}
          />

          <input
            className="input"
            placeholder="Country"
            name="country"
            value={profile.country || ""}
            onChange={onChange}
          />

          <input
            className="input"
            placeholder="Profile Image URL"
            name="profile_image"
            value={profile.profile_image || ""}
            onChange={onChange}
          />
        </div>

        <button
          className="btn-primary"
          onClick={onSave}
          disabled={saving}
          style={{ marginTop: "20px" }}
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null; // no navbar on login/register

  const avatarLetter = user.username ? user.username[0].toUpperCase() : "?";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/home" className="navbar-brand">
          AirPortal
        </Link>

        <div className="navbar-links">
          <Link className="nav-link" to="/search">
            Search
          </Link>
          <Link className="nav-link" to="/bookings">
            My Bookings
          </Link>

          {/* PROFILE DROPDOWN */}
          <div className="nav-profile" onClick={() => setOpen((o) => !o)}>
            <div className="nav-avatar">
              {user.profile_image ? (
                <img src={user.profile_image} alt="avatar" />
              ) : (
                <span>{avatarLetter}</span>
              )}
            </div>
            <span className="nav-username">{user.username}</span>

            {open && (
              <div className="nav-dropdown">
                <Link
                  className="dropdown-item"
                  to="/profile"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="dropdown-item danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

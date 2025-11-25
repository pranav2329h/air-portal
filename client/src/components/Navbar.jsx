// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const onLogout = () => {
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
          <Link className="nav-link" to="/home">
            Search
          </Link>
          <Link className="nav-link" to="/bookings">
            My Bookings
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <button className="nav-btn secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

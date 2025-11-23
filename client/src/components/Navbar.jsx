import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/home" className="navbar-brand">AirPortal</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <div className="navbar-links">
          {user && <Link className="nav-link" to="/search">Search</Link>}

          {user ? (
            <>
              <Link className="nav-link" to="/bookings">My Bookings</Link>
              <button
                className="nav-btn secondary"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link to="/register">
                <button className="nav-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("access");

  // If no token → user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists but user not loaded yet (refresh case)
  if (token && !user) {
    return (
      <div style={{ textAlign: "center", padding: "40px", fontSize: "20px" }}>
        Loading...
      </div>
    );
  }

  // User + token exist → allowed
  return children;
}

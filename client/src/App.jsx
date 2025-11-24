import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import { setUser } from "./store/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  // Hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) {
      try {
        dispatch(setUser(JSON.parse(raw)));
      } catch (e) {
        console.error(e);
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {user && <Navbar />}

      <Routes>
        {/* Default → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

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
import { me as fetchMe } from "./api/auth";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  // Load user if token exists
  useEffect(() => {
  const token = localStorage.getItem("access");
  if (token && !user) {
    fetchMe()
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => console.log("Token invalid or expired"));
  }
}, []);
  return (
    <BrowserRouter>
      {/* Show Navbar only when user is logged in */}
      {user && <Navbar />}

      <Routes>
        {/* DEFAULT → LOGIN PAGE */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN PAGES */}
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

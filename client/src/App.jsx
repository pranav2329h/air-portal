// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

import { loadUserFromStorage } from "./store/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/home" : "/login"} replace />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/home" /> : <Register />}
        />

        {/* Main pages */}
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
    </>
  );
}

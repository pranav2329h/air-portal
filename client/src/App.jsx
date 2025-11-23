import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";   // (you will add this file)

// Auth protection
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>

      {/* Navbar will show only when user is logged in */}
      <Navbar />

      <Routes>
        {/* Default Route → Login Page */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home - only after login */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Search Results */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* User Bookings */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Profile Page */}
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

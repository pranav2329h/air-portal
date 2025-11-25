// src/api/flights.js
import http from "./http";

// Get flights (filters optional)
// params: { source, destination, date }
export const searchFlights = (params = {}) =>
  http.get("/flights/search/", { params });

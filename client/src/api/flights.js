import http from "./http";

// Search flights
export const searchFlights = (params) =>
  http.get("/api/flights/search/", { params });

export const checkCoupon = (code) =>
  http.get(`/api/flights/coupon/${code}/`);


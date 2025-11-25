import http from "./http";

export const searchFlights = (params) =>
  // params can be {}, or { source, destination, date }
  http.get("/flights/search/", { params });

export const checkCoupon = (code) =>
  http.get(`/flights/coupon/${code}/`);

export const getAirports = () =>
  http.get("/flights/airports/");

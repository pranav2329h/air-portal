import http from "./http";

export const searchFlights = (params) =>
  http.get("/flights/search/", { params });

export const checkCoupon = (code) =>
  http.get(`/flights/coupon/${code}/`);

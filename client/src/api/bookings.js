import http from "./http";

export const createBooking = (data) =>
  http.post("/bookings/create/", data);

export const myBookings = () =>
  http.get("/bookings/");

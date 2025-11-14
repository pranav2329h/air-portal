import http from "./http";

export const makePayment = (booking_id) =>
  http.post("/payments/", { booking_id });

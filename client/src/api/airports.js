import http from "./http";

export const searchAirports = (query) =>
  http.get(`/flights/airports/?q=${query}`);

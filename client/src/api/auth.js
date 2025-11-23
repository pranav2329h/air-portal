import http from "./http";

// REGISTER USER
export const register = (data) =>
  http.post("/api/auth/register/", data);

// LOGIN → MUST SEND username + password
export const login = (username, password) =>
  http.post("/api/auth/token/", { username, password });

// GET LOGGED-IN USER
export const me = () => http.get("/api/auth/me/");

// UPDATE PROFILE
export const updateProfile = (data) =>
  http.put("/api/auth/update/", data);

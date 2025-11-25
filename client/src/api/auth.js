import http from "./http";

// Register new user
export const register = (data) => http.post("/auth/register/", data);

// Login → returns { access, refresh }
export const login = (data) => http.post("/auth/token/", data);

// Get current user
export const me = () => http.get("/auth/me/");

// Update profile data
export const updateProfile = (data) => http.put("/auth/update/", data);

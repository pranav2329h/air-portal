import http from "./http";

export const register = (data) => http.post("/api/auth/register/", data);

export const login = (data) => http.post("/api/auth/token/", data);

export const getMe = () => http.get("/api/auth/me/");

export const updateProfile = (data) => http.put("/api/auth/update/", data);

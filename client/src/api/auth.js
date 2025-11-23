import http from "./http";

export const register = (data) => http.post("/auth/register/", data);

export const login = (data) => http.post("/auth/token/", data); // { username, password }

export const getMe = () => http.get("/auth/me/");

export const updateProfile = (data) => http.put("/auth/profile/", data);

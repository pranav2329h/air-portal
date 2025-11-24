import http from "./http";

export const register = (data) => http.post("/auth/register/", data);
export const login = (data) => http.post("/auth/token/", data);
export const me = () => http.get("/auth/me/");
export const updateProfile = (data) => http.put("/auth/update/", data);

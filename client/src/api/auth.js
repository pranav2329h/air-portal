import http from "./http";

export const register = (payload) => http.post("/auth/register/", payload);
export const login = (username, password) =>
  http.post("/auth/token/", { username, password });
export const me = () => http.get("/auth/me/");

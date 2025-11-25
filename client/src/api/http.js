// src/api/http.js
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api", // Django backend
  withCredentials: false,
});

export default http;

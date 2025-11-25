import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api", // IMPORTANT: only one /api here
  withCredentials: false,
});

export default http;

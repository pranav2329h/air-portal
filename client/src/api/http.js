import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api",   // EXACTLY THIS
  withCredentials: false,
});

export default http;

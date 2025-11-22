import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// List of endpoints that do NOT require token
const excludeEndpoint = [
  "/profile/login",
  "/profile/signup",
  "/profile/register",
  "/status",
  "/profile/activate",
  "/health",
];

// Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {

    // FIX: Added return here
    const shouldSkipToken = excludeEndpoint.some((endpoint) => {
      return config.url?.includes(endpoint);
    });

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/profile/login";
      } else if (error.response.status === 500) {
        console.log("Server error please try again later");
      } else if (error.code === "ECONNABORTED") {
        console.log("Request timeout please try again");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;

import axios from "axios";

// by default base URL of "/api" works without any .env file
// in production, set VITE_API_BASE_URL to your deployed API's full URL.

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({baseURL});

export default api;
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log(
      "API Request:",
      config.method.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export async function createJob(data) {
  return API.post("/jobs", data);
}

export async function listJobs(params) {
  return API.get("/jobs", { params });
}

export async function getJob(id) {
  return API.get(`/jobs/${id}`);
}

export async function runJob(id) {
  return API.post(`/run-job/${id}`);
}

export default API;

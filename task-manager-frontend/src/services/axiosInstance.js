import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Your backend port
});

// Automatically inject token into every request header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 👈 THIS IS THE SECRET SAUCE
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
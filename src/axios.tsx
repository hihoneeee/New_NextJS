import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_PORT,
});

// Add request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy token từ cookie
    const token = Cookies.get("access_token");

    // Kiểm tra và thêm token vào headers nếu tồn tại
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Handle response error
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      console.error("Network error or unexpected error:", error);
      return Promise.reject({ message: "An unexpected error occurred" });
    }
  }
);

export default instance;

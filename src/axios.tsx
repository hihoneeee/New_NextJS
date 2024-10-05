import axios from "axios";

// Define the structure of the token
interface Token {
  state?: {
    token?: string;
  };
}

// Create Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_PORT,
});

// Add request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("FastFoodRes");

    // Safely parse token with proper typing
    let parsedToken: Token | null = null;
    try {
      parsedToken = token ? JSON.parse(token) : null;
    } catch (e) {
      console.error("Error parsing token from localStorage", e);
    }

    // Check if the parsed token exists and has the correct structure
    if (parsedToken?.state?.token) {
      // Use the 'set' method to add the Authorization header
      if (config.headers) {
        config.headers.set(
          "Authorization",
          `Bearer ${parsedToken.state.token}`
        );
      }
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

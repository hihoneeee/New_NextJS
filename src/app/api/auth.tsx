/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import axios from "../../axios";

interface AuthResponse {
  success: boolean;
  refresh_token: string;
  access_token: string;
  [key: string]: any;
}

export const apiRegister = async (
  data: any
): Promise<AuthResponse | undefined> =>
  axios({
    url: "/auth/register",
    method: "POST",
    data,
  });

export const apiLogin = async (
  data: any
): Promise<AuthResponse | undefined> => {
  try {
    const response: AuthResponse = await axios({
      url: "/auth/login",
      method: "POST",
      data,
    });

    const existingRefreshToken = Cookies.get("refresh_token");
    if (existingRefreshToken) {
      Cookies.remove("refresh_token", { path: "/" });
    }

    if (response?.success) {
      const expirationTime = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7 days
      );
      Cookies.set("refresh_token", response.refresh_token, {
        expires: expirationTime,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
    }
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return undefined;
  }
};

export const apiLogout = () =>
  axios({
    url: "/auth/logout",
    method: "POST",
  });

export const apiRefreshToken = async (
  data: any
): Promise<AuthResponse | undefined> =>
  axios({
    url: "/auth/refresh-token",
    method: "POST",
    data,
  });

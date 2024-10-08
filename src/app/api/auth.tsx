/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import axios from "../../axios";
import { jwtDecode } from "jwt-decode";

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
  const response: AuthResponse = await axios({
    url: "/auth/login",
    method: "POST",
    data,
  });

  const existingRefreshToken = Cookies.get("refresh_token");
  if (existingRefreshToken) {
    Cookies.remove("refresh_token", { path: "/" });
  }

  const existingAccessToken = Cookies.get("access_token");
  if (existingAccessToken) {
    Cookies.remove("access_token", { path: "/" });
  }

  if (response?.success) {
    const refreshToken = response.refresh_token;
    const accessToken = response.access_token;

    const decodedRefreshToken = jwtDecode<{ exp: number }>(refreshToken);
    const decodedAccessToken = jwtDecode<{ exp: number }>(accessToken);

    Cookies.set("refresh_token", refreshToken, {
      expires: new Date(decodedRefreshToken.exp * 1000),
      path: "/",
      secure: true,
      sameSite: "Strict",
    });

    Cookies.set("access_token", accessToken, {
      expires: new Date(decodedAccessToken.exp * 1000),
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  }
  return response;
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

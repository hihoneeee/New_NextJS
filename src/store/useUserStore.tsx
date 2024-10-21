import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetCurrent } from "@/app/api/user";
import { apiRefreshToken } from "@/app/api/auth";
import { jwtDecode } from "jwt-decode";
import { UserType, User } from "@/types/userTypes";

export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      current: null,
      getCurrent: async () => {
        const token = Cookies.get("access_token");

        const isTokenExpired = (token: string) => {
          const decoded: { exp: number } = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decoded.exp < currentTime + 10;
        };

        if (token && !isTokenExpired(token)) {
          const response = await apiGetCurrent();
          if (response && response.success) {
            const userData: User = response.data;
            return set(() => ({ current: userData }));
          }
        }

        const refreshToken = Cookies.get("refresh_token");
        if (refreshToken) {
          const refreshResponse = await apiRefreshToken({
            refresh_token: refreshToken,
          });

          if (refreshResponse && refreshResponse.success) {
            const newAccessToken = refreshResponse.access_token;
            const decodedAccessToken = jwtDecode<{ exp: number }>(
              newAccessToken
            );

            Cookies.set("access_token", newAccessToken, {
              expires: new Date(decodedAccessToken.exp * 1000),
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            const retryResponse = await apiGetCurrent();
            if (retryResponse && retryResponse.success) {
              const userData: User = retryResponse.data;
              return set(() => ({ current: userData }));
            }
          }
        }
      },
      clearCurrent: () => {
        set(() => ({ current: null }));
        Cookies.remove("access_token", { path: "/" });
        Cookies.remove("refresh_token", { path: "/" });
      },
    }),
    {
      name: "ThreadsHCR",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter((el) => el[0] === "current")
        ),
    }
  )
);

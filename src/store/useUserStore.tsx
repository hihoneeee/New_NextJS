import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetCurrent } from "@/app/api/user";
import { apiRefreshToken } from "@/app/api/auth";
import { jwtDecode } from "jwt-decode";

type UserType = {
  current: object | null;
  getCurrent: () => Promise<void>;
  clearCurrent: () => void;
};

export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      current: null,
      getCurrent: async () => {
        const token = Cookies.get("access_token");

        const isTokenExpired = (token: string) => {
          const decoded: { exp: number } = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decoded.exp < currentTime + 10; // Token sẽ hết hạn trong 10 giây
        };

        // Nếu token còn và sắp hết hạn trong 10 giây
        if (token) {
          if (!isTokenExpired(token)) {
            const response = await apiGetCurrent();
            if (response && response.success) {
              return set(() => ({ current: response.data }));
            }
          } else {
            // Token sắp hết hạn, làm mới token
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

                // Cập nhật access_token trong cookie
                Cookies.set("access_token", newAccessToken, {
                  expires: new Date(decodedAccessToken.exp * 1000),
                  path: "/",
                  secure: true,
                  sameSite: "Strict",
                });

                // Thử lại apiGetCurrent với access_token mới
                const retryResponse = await apiGetCurrent();
                if (retryResponse && retryResponse.success) {
                  return set(() => ({ current: retryResponse.data }));
                }
              }
            } else {
              window.location.reload();
            }
          }
        } else {
          set(() => ({ current: null }));
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

import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetCurrent } from "@/app/api/user";
import { apiRefreshToken } from "@/app/api/auth";

type UserType = {
  token: string | null;
  current: object | null;
  setToken: (token: string | null) => void;
  getCurrent: () => Promise<void>;
  clearCurrent: () => void;
};

export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      token: null,
      current: null,
      setToken: (token: string | null) => set(() => ({ token })),
      getCurrent: async () => {
        const response = await apiGetCurrent();
        if (response && response.success) {
          set(() => ({ current: response.data }));
        } else {
          set(() => ({ current: null }));
          const refreshToken = Cookies.get("refresh_token");
          if (refreshToken) {
            const refreshResponse = await apiRefreshToken({
              refresh_token: refreshToken,
            });

            if (refreshResponse?.success) {
              set(() => ({ token: refreshResponse.access_token || null }));
              const retryResponse = await apiGetCurrent();

              if (retryResponse?.success) {
                return set(() => ({ current: retryResponse.data }));
              } else {
                return set(() => ({ current: null }));
              }
            } else {
              return set(() => ({ current: null }));
            }
          } else {
            console.error("No refresh token available in cookies");
          }
        }
      },
      clearCurrent: () => {
        set(() => ({ current: null }));
      },
    }),
    {
      name: "FastFoodRes",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            (el) => el[0] === "token" || el[0] === "current"
          )
        ),
    }
  )
);

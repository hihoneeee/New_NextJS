"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useUserStore } from "@/store";

interface UserContextType {
  token: string | null;
  current: object | null;
  getCurrent: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { token, current, getCurrent } = useUserStore();

  useEffect(() => {
    getCurrent();
  }, [token]);

  return (
    <UserContext.Provider value={{ token, current, getCurrent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext phải được sử dụng bên trong UserProvider");
  }
  return context;
};

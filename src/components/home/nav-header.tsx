"use client";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/user-provider";
import { useUserStore } from "@/store";
import React from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const NavHeader = () => {
  const { current } = useUserContext();
  const { setToken, getCurrent, clearCurrent } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    setToken("");
    getCurrent(null);
    clearCurrent();
    Cookies.remove("refresh_token", { path: "/" });
    router.push("/login");
    toast.success("Logout successfully!");
  };
  return (
    <div>
      <ul className="flex items-center gap-3 desktop:text-base laptop:text-sm text-xs">
        <li>
          <p>xin chào {current?.name}</p>
        </li>
        <li>
          <Button
            onClick={() => handleLogout()}
            className="w-full"
            type="submit"
          >
            logout
          </Button>{" "}
        </li>
      </ul>
    </div>
  );
};

export default NavHeader;

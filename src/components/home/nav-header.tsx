"use client";
import { ModeToggle } from "@/components/dark-mode/mode-toggle";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/user-provider";
import { useUserStore } from "@/store";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NavHeader = () => {
  const { current } = useUserContext();
  const { setToken, getCurrent, clearCurrent } = useUserStore();
  const handleLogout = () => {
    setToken("");
    getCurrent(null);
    clearCurrent();
    Cookies.remove("refresh_token", { path: "/" });
    toast.success("Logout successfully!");
  };
  return (
    <div>
      {!current ? (
        <ul className="flex items-center gap-3 desktop:text-base laptop:text-sm text-xs">
          <li>
            <Link href="/login">Đăng nhập</Link>
          </li>
          <li>
            <Link href="/register">Đăng ký</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      ) : (
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
      )}
    </div>
  );
};

export default NavHeader;

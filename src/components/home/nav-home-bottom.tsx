"use client";
import { useUserStore } from "@/store";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import icons from "@/utils/icons";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode/mode-toggle";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
const { SettingsIcon } = icons;
const NavHomeBottom = () => {
  const [OpenSetting, setOpenSetting] = useState("settingOff");
  const { getCurrent, clearCurrent } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    getCurrent(null);
    clearCurrent();
    Cookies.remove("refresh_token", { path: "/" });
    router.push("/login");
    toast.success("Logout successfully!");
  };
  return (
    <div className="flex flex-col items-center gap-6 transition-all">
      <div
        onClick={() =>
          setOpenSetting((prev) =>
            prev === "settingOff" ? "settingOn" : "settingOff"
          )
        }
        className={twMerge(
          clsx(
            "px-4 py-2 rounded-xl hover:dark:text-white dark:text-[#4d4d4d] text-textColorLight cursor-pointer",
            OpenSetting === "settingOn" && "dark:text-white text-black"
          )
        )}
      >
        <SettingsIcon size={30} />
      </div>
      <ModeToggle />

      {OpenSetting === "settingOn" && (
        <div className="p-3 rounded-2xl dark:bg-divColor border border-gray-borderDarkColor shadow-xl flex flex-col absolute bottom-0 left-[7rem] w-[15%]">
          <Link
            className="px-2 py-4 rounded-lg dark:text-white hover:dark:bg-overlay-main-40 font-semibold text-black hover:bg-overlay-4"
            href="/insights"
          >
            Thông tin chi tiết
          </Link>
          <Link
            className="px-2 py-4 rounded-lg dark:text-white hover:dark:bg-overlay-main-40 font-semibold text-black hover:bg-overlay-4"
            href="/setting"
          >
            Cài đặt
          </Link>
          <div
            onClick={() => handleLogout()}
            className="px-2 py-4 rounded-lg dark:text-white hover:dark:bg-overlay-main-40 font-semibold text-black hover:bg-overlay-4"
          >
            Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
};

export default NavHomeBottom;

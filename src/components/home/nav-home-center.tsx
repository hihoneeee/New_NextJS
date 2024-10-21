"use client";
import React from "react";
import { usePathname } from "next/navigation";
import icons from "@/utils/icons";
import Link from "next/link";
import { HomeSidebarCenter } from "@/utils/common";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const { Plus } = icons;
const NavHomeCenter = () => {
  // const { current } = useUserContext();
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-6">
      {HomeSidebarCenter.map((el) => {
        const isActive = pathname === el.path;
        return (
          <>
            <Link
              key={el.id}
              className={twMerge(
                clsx(
                  "px-4 py-2 rounded-lg hover:dark:bg-divColor hover:dark:text-white dark:text-textColorDark text-textColorLight hover:bg-overlay-10 hover:text-black",
                  isActive && "dark:text-white text-black"
                )
              )}
              href={el.path}
            >
              <el.icon size={28} />
            </Link>
            {el.id === 2 && (
              <div className="px-4 py-2 rounded-lg text-textColorLight bg-overlay-10 hover:text-black hover:dark:text-white dark:text-[#4d4d4d] dark:bg-divColor">
                <Plus size={28} />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default NavHomeCenter;

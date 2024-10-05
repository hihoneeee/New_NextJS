import NavHeader from "@/components/home/nav-header";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-[#000816] py-4 px-8">
      <ul>
        <li>
          <Link href="/">WebBanHang</Link>
        </li>
      </ul>
      <NavHeader />
    </div>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="p-5 border-b dark:border-borderDarkColor flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://res.cloudinary.com/da7u0cpve/image/upload/v1726024342/phong_tro_123/xkvyu5gqouslwhidx330.jpg"
            alt="image"
            className="h-[2.5rem] w-[2.5rem] object-cover shadow-2xl  rounded-full object-cover"
          />
          <p className="dark:text-textColorDark text-gray-400">Có gì mới?</p>
        </div>
        <Button>Đăng</Button>
      </div>

      <div className="h-[100rem]"></div>
    </div>
  );
};

export default HomePage;

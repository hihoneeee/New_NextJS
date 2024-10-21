"use client";
import { Button } from "@/components/ui/button";
import { useAppStore, useUserStore } from "@/store";
import React from "react";
import AvatarDefault from "@/assets/default-user.png";
import CreatePost from "@/components/post/create-post";
const NewFeedHome = () => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  return (
    <div>
      <div className="p-5 border-b dark:border-borderDarkColor flex items-center justify-between">
        <div className="flex items-center gap-4 w-[90%]">
          <img
            src={
              typeof current?.avatar === "string"
                ? current.avatar
                : AvatarDefault.src
            }
            alt="image"
            className="h-[2.5rem] w-[2.5rem] object-cover shadow-2xl  rounded-full object-cover"
          />
          <p
            className="dark:text-textColorDark text-gray-400 cursor-pointer w-full"
            onClick={() => setModal(true, <CreatePost />)}
          >
            Có gì mới?
          </p>
        </div>
        <Button onClick={() => setModal(true, <CreatePost />)}>Đăng</Button>
      </div>
    </div>
  );
};

export default NewFeedHome;

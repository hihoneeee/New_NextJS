"use client";
import { Plus } from "lucide-react";
import React from "react";

const CreatePostHome = () => {
  return (
    <div className="p-6 hover:p-7 rounded-2xl border border-borderDarkColor text-black bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.24)] dark:text-white dark:bg-divColor fixed bottom-6 right-8 transition-all cursor-pointer">
      <Plus size={30} />
    </div>
  );
};

export default CreatePostHome;

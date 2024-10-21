import React from "react";

const CreatePost = () => {
  return (
    <>
      <h2>Thêm threads mới</h2>
      <div
        className="p-6 dark:bg-divColor bg-white rounded-2xl w-[30%] space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        CreatePost
      </div>
    </>
  );
};

export default CreatePost;

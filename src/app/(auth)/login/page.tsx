import LoginForm from "@/app/(auth)/login/login-form";
import React from "react";
import imgLogin from "@/assets/threads-logo.gif";
import Image from "next/image";
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
      <div className=" rounded-e-md h-[24.4rem]">
        <Image
          src={imgLogin}
          alt="Login Image"
          width={500}
          height={800}
          className="h-full rounded-e-md"
        />
      </div>
    </div>
  );
};

export default LoginPage;

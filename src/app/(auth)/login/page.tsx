import LoginForm from "@/app/(auth)/login/login-form";
import React from "react";
import imgLogin from "@/assets/logo.jpg";
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
          height={900}
          className="object-cover desktop:h-[24.8rem] laptop:h-[24rem] rounded-e-md"
        />
      </div>
    </div>
  );
};

export default LoginPage;

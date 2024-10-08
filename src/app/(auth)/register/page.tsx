import RegisterForm from "@/app/(auth)/register/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="laptop:px-[8rem] desktop:px-[18rem] px-[2rem] py-12 space-y-8">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

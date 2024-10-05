/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import icons from "@/utils/icons";
import { apiRegister } from "@/app/api/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const { Eye, EyeOff } = icons;
const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "Họ và tên phải có ít nhất 5 ký tự.",
    }),
    phone: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 số.")
      .max(11, "Số điện thoại không được vượt quá 11 số.")
      .refine((phoneNumber) => phoneNumber.startsWith("0"), {
        message: "Số điện thoại phải bắt đầu bằng số 0.",
      }),
    password: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Xác nhận mật khẩu phải có ít nhất 2 ký tự.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp.",
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...payload } = values;

    const response = await apiRegister({
      roleCode: "DA5",
      ...payload,
    });
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Chúc mừng bạn!",
        text: "Tạo tài khoản thành công",
        showConfirmButton: true,
        confirmButtonText: "Đăng nhập",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          router.push("/login");
        }
      });
    } else toast.error(response && response.msg);
  }

  return (
    <div className="w-[35%] mx-auto border border-gray-500 p-6 rounded-md space-y-3">
      {" "}
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center desktop:text-3xl laptop:text-2xl text-base font-bold">
          Đăng Ký
        </h1>
        <span className="text-gray-400 desktop:text-sm laptop:text-xs text-xxs font-semibold">
          Nơi đăng ký tài khoản cho admin
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thông tin...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="appearance-none"
                    placeholder="Nhập thông tin...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập thông tin...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[2.5rem] cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

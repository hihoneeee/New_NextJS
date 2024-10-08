"use client";
import React from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import icons from "@/utils/icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiLogin } from "@/app/api/auth";
import { useUserStore } from "@/store";
import Link from "next/link";
const { Eye, EyeOff } = icons;
const formSchema = z.object({
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
});
const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const { setToken } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await apiLogin(values);
    if (response && response.success) {
      toast.success("Đăng nhập thành công!");
      setToken(response.access_token);
      router.push("/home");
    } else {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  }

  return (
    <div className="laptop:w-[35%] w-full p-6 rounded-s-md space-y-6 h-[30%]">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center desktop:text-3xl laptop:text-2xl text-xl font-bold">
          Đăng Nhập
        </h1>
        <span className="text-gray-400 desktop:text-sm laptop:text-xs text-xxs font-semibold">
          Nơi đăng nhập tài khoản của bạn
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="laptop:text-sm text-xs">
                  Số điện thoại
                </FormLabel>
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
                  <FormLabel className="laptop:text-sm text-xs">
                    Mật khẩu
                  </FormLabel>
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
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </div>
          </div>
          <Button className="w-full" type="submit">
            Đăng nhập
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-between">
        <p className="laptop:text-xs text-xxs text-gray-400">
          Bạn quên mật khẩu? Khôi phục{" "}
          <Link
            className="text-white cursor-pointer hover:underline"
            href="/forgot"
            replace
          >
            tại đây!
          </Link>
        </p>
        <Link
          className="laptop:text-xs text-xxs cursor-pointer hover:underline"
          href="/register"
          replace
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

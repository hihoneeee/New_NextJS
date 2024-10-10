import { Header, ToastNotification } from "@/components";
import { UserProvider } from "@/hooks/user-provider";
import { Plus } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div>
        <Header />
        <div className="flex-grow flex items-start justify-center">
          <div className="border dark:bg-divColor dark:border-borderDarkColor border-gray-300 bg-white rounded-2xl w-[40%] mt-14">
            {children}
          </div>
        </div>
        <div className="p-6 hover:p-7 rounded-2xl border border-borderDarkColor text-black bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.24)] dark:text-white dark:bg-divColor fixed bottom-6 right-8 transition-all cursor-pointer">
          <Plus size={30} />
        </div>{" "}
        <ToastNotification />
      </div>
    </UserProvider>
  );
}

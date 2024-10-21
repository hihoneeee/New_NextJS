import { CreatePostHome, SidebarHome, ToastNotification } from "@/components";
import { UserProvider } from "@/hooks/user-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div>
        <SidebarHome />
        <div className="flex-grow flex items-start justify-center">
          <div className="border shadow-[0px_0px_10px_5px_rgba(0,0,0,0.10)] dark:bg-divColor dark:border-borderDarkColor border-gray-300 bg-white rounded-3xl laptop:w-[40%] desktop:w-[35%] mt-14">
            {children}
          </div>
        </div>
        <CreatePostHome />
        <ToastNotification />
      </div>
    </UserProvider>
  );
}

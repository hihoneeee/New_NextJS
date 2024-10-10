import icons from "@/utils/icons";
const { Home, Search, Heart, User2 } = icons;
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the Payload part of the JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const HomeSidebarCenter = [
  {
    id: 1,
    title: "Trang chủ",
    icon: Home,
    path: "/home",
  },
  {
    id: 2,
    title: "Tìm kiếm",
    icon: Search,
    path: "/search",
  },
  {
    id: 3,
    title: "Yêu thích",
    icon: Heart,
    path: "/wishlist",
  },
  {
    id: 4,
    title: "Trang cá nhân",
    icon: User2,
    path: "/profile",
  },
];

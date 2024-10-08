import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["/login", "/register"];
const privatePathsRegex = /^\/(?!login|register).*/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("access_token")?.value;

  // Nếu không có sessionToken
  if (!sessionToken) {
    // Cho phép truy cập login và register nếu chưa đăng nhập
    if (authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Chuyển hướng đến login nếu truy cập trang yêu cầu sessionToken
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu có sessionToken
  if (sessionToken) {
    // Không cho vào login/register nữa khi đã đăng nhập
    if (authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url)); // Chuyển hướng về trang chủ hoặc trang khác
    }
  }

  // Cho phép truy cập vào tất cả các trang khác
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Match tất cả các trang trừ các file tĩnh
};

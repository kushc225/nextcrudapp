import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return true;
  }
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value || "";
  if (
    (path === "/profile" ||
      path === "/todo" ||
      path === "/signup/" ||
      path === "/logout") &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/logout", "/signup", "/profile", "/todo"],
};

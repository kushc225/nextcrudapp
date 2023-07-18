import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return true;
  }
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = req.cookies.get("token")?.value || "";
  // const token = req.headers.cookie;
  console.log("token called ", token);
  if (path === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path === "/todo" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path === "/logout" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  } else if (!isPublicPath && !token) {
    NextResponse.redirect(new URL("/login", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/logout", "/signup", "/profile", "/todo"],
};

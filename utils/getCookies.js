import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
export default async function getCookie(req) {
  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return true;
  }
  const token = req.cookies.get("token")?.value || "";
  const decodedToken = await Jwt.verify(token, process.env.JWT_SEC_KEY);
  return decodedToken;
}

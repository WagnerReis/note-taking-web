import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const TOKEN_KEY = "authToken";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get(TOKEN_KEY);

  const protectedRoutes = ["/"];

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

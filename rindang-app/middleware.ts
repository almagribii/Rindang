// middleware.ts

import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Tangkap root path
    "/auth/login", // Untuk login logic
    "/dashboard/:path*", // Untuk melindungi area admin
  ],
};

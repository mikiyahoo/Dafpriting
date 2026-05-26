import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin static files
    if (pathname.startsWith("/admin/_next")) {
      return NextResponse.next();
    }

    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

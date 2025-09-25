// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is trying to access protected routes
  if (pathname.startsWith("/home") || pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get("anniversary-session");

    // If no valid session, redirect to login
    if (!sessionCookie || sessionCookie.value !== "valid") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is already logged in and trying to access login page
  if (pathname === "/") {
    const sessionCookie = request.cookies.get("anniversary-session");

    if (sessionCookie && sessionCookie.value === "valid") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "hunky_dory_super_secret_jwt_key_2026_diverse_learners";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "hunky_dory_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let session: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, encodedSecret);
      session = payload;
    } catch {
      session = null;
    }
  }

  // 1. If accessing login page while already authenticated, redirect to /admin
  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based route guard in admin portal
    // Clinical assessments are restricted to ADMIN and SPECIALIST (STAFF cannot access)
    if (pathname.startsWith("/admin/assessments") && session.role === "STAFF") {
      const redirectUrl = new URL("/admin", request.url);
      redirectUrl.searchParams.set("error", "unauthorized_clinical_access");
      return NextResponse.redirect(redirectUrl);
    }

    // Pass user context forward to downstream server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(session.userId || ""));
    requestHeaders.set("x-user-email", String(session.email || ""));
    requestHeaders.set("x-user-role", String(session.role || ""));
    requestHeaders.set("x-user-name", String(session.name || ""));

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};

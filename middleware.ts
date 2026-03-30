import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(request: NextRequest) {
    // Admin route protection
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const token = request.nextauth.token;
      
      // Check if user is admin (you should store admin status in token/DB)
      if (!token || token.email !== "admin@aiadvisor.tools") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/gamification/:path*"
  ]
};

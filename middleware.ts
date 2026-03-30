import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(request: NextRequest & { nextauth: { token: { email?: string | null } | null } }) {
    // Admin route protection
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const token = request.nextauth.token;

      // Check if user is admin
      if (!token || token.email !== process.env.ADMIN_EMAIL) {
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

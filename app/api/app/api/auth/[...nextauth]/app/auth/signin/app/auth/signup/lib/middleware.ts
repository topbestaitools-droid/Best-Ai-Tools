import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(request: NextRequest) {
    // Add custom middleware logic here if needed
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
  matcher: ["/dashboard/:path*", "/profile/:path*"]
};

import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  authMiddlewareProtectedRoutes,
} from "./middleware/auth.middleware";
import {
  HomeMiddleware,
  homeMiddlewareProtectedRoutes,
} from "./middleware/home.middleware";
import { isProtectedRoute } from "./middleware/isProtectedRoute";
export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  try {
    if (isProtectedRoute(pathname, homeMiddlewareProtectedRoutes)) {
      const authResponse = HomeMiddleware(request);
      if (authResponse.status !== 200) return authResponse;
    }

    if (isProtectedRoute(pathname, authMiddlewareProtectedRoutes)) {
      const authResponse = authMiddleware(request);
      if (authResponse.status !== 200) return authResponse;
    }
    return NextResponse.next();
  } catch (err: unknown) {
    console.error("Error in middleware:", err);
  }
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};

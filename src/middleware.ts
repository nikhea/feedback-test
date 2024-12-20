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
export async function middleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
  const { pathname } = request.nextUrl;
  console.log({ pathname });

  try {
    if (isProtectedRoute(pathname, authMiddlewareProtectedRoutes)) {
      const response = await authMiddleware(request);
      if (response.status !== 200) return response;
    }

    if (isProtectedRoute(pathname, homeMiddlewareProtectedRoutes)) {
      const response = await HomeMiddleware(request);
      if (response.status !== 200) return response;
    }
    return NextResponse.next();
  } catch (err: unknown) {
    console.error("Error in middleware:", err);

    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};

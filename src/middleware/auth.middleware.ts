import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token");

    if (!token) {
      const currentPath = request.nextUrl.pathname;

      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("from", currentPath);

      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } catch (error: unknown) {
    console.error("Error in auth middleware:", error);

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const authMiddlewareProtectedRoutes = [
  "/dashboard",
  "/profile",
  "/posts",
  "/posts/audioPlayer",
  "posts/audioPlayer",
  "/audioPlayer",
  "/posts/:path*",
  "/post/:path*",
];

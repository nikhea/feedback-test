import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);
export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  const token = request.cookies.get("auth_token");

  try {
    if (!token) {
      const currentPath = request.nextUrl.pathname;

      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("from", currentPath);

      return NextResponse.redirect(loginUrl);
    }

    const tokenValue = token.value;

    const { payload } = await jwtVerify(tokenValue, JWT_SECRET_BUFFER);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | any) {
    console.error("Error in auth middleware:", error);

    if (error instanceof JWTExpired) {
      // console.error("Token has expired:", error.payload);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }

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

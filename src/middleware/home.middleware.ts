import { NextRequest, NextResponse } from "next/server";

export const homeMiddlewareProtectedRoutes = ["/login", "/signup", "/register"];

export async function HomeMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const token = request.cookies.get("auth_token");
    if (token) {
      return NextResponse.redirect(
        new URL(request.headers.get("referer") || "/", request.url)
      );
    }
    return NextResponse.next();
  } catch (error: unknown) {
    console.error("Error in Home middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

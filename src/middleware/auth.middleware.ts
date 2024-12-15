import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);
export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  const token = request.cookies.get("auth_token");

  try {
    if (!token) {
      return redirectToLogin(request);
    }

    const tokenValue = token.value;

    await checkPayloadExpires(request, tokenValue);
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | any) {
    console.error("Error in auth middleware:", error);

    return handleAuthError(request);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkPayloadExpires(request: NextRequest, tokenValue: string) {
  const { payload } = await jwtVerify(tokenValue, JWT_SECRET_BUFFER);

  if (payload.exp && Date.now() >= payload.exp * 1000) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

function redirectToLogin(request: NextRequest): NextResponse {
  const currentPath = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", currentPath);
  return NextResponse.redirect(loginUrl);
}

function handleAuthError(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("auth_token");
  return response;
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

// if (error instanceof JWTExpired) {
//   const response = NextResponse.redirect(new URL("/login", request.url));
//   response.cookies.delete("auth_token");
//   return response;
// }

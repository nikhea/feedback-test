import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "@/db/mongoDB";
import UserModel from "@/model/user.model";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  // const from = searchParams.get("from") || "/dashboard";

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code provided" },
      { status: 400 }
    );
  }

  try {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // Fetch user info
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );
    const userData = await response.json();

    // Connect to database
    await connectDB();
    // // Find or create user
    let user = await UserModel.findOne({
      $or: [{ email: userData.email }, { googleId: userData.sub }],
    });
    if (!user) {
      // Create new user
      user = new UserModel({
        email: userData.email,
        username: userData.name || userData.email.split("@")[0],
        googleId: userData.sub,
        is_deleted: false,
        password: "", // No password for Google-authenticated users
      });
      await user.save();
    }

    // Generate JWT token
    const token = await new SignJWT({ userId: user._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(JWT_SECRET_BUFFER);

    // Set cookie
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    // Create response with cookie
    // return NextResponse.redirect(new URL(from, request.url));
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Google OAuth Error:", error);

    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

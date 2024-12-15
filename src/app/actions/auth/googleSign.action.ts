"use server";

import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import UserModel from "@/model/user.model";
import { connectDB } from "@/db/mongoDB";
import { handleAPIResponse } from "@/utils/APIHandleResponse.util";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

// Generate Google OAuth Authorization URL
export async function generateGoogleAuthURL() {
  const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "openid",
    ],
    prompt: "consent",
  });

  return { url: authorizeUrl };
}

// Handle OAuth Callback
export async function handleGoogleOAuthCallback(searchParams: {
  code?: string;
}) {
  if (!searchParams.code) {
    throw new Error("No authorization code provided");
  }

  const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(searchParams.code);
    oAuth2Client.setCredentials(tokens);

    // Fetch user info
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );
    const userData = await response.json();

    // Connect to database
    await connectDB();

    // Find or create user
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

    // Redirect to dashboard or home page
    redirect("/dashboard");
  } catch (error) {
    console.error("Google OAuth Error:", error);
    throw error;
  }
}

// Verify Google ID Token (for client-side Google Sign-In)
export async function verifyGoogleToken(idToken: string) {
  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return handleAPIResponse(false, 401, "Invalid Google token", null, [
        "Google authentication failed",
      ]);
    }

    // Connect to database
    await connectDB();

    // Find or create user
    let user = await UserModel.findOne({
      $or: [{ email: payload.email }, { googleId: payload.sub }],
    });

    if (!user) {
      // Create new user
      user = new UserModel({
        email: payload.email!,
        username: payload.name || payload.email!.split("@")[0],
        googleId: payload.sub,
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

    // Prepare response data
    const plainUser = user.toObject();
    const responseData = {
      _id: plainUser._id.toString(),
      email: plainUser.email,
      is_deleted: false,
      username: plainUser.username,
    };

    return handleAPIResponse(
      true,
      200,
      "Google Sign-In successful",
      responseData
    );
  } catch (error) {
    console.error("Google Token Verification Error:", error);
    return handleAPIResponse(
      false,
      500,
      "An error occurred during Google Sign-In",
      null,
      [error instanceof Error ? error.message : "Internal server error"]
    );
  }
}

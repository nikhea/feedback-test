"use server";
import { connectDB } from "@/db/mongoDB";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "@/model/user.model";
import { handleAPIResponse, APIResponse } from "@/utils/APIHandleResponse.util";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

export interface ILogInActionForm {
  email: string;
  password: string;
}
export async function loginAction(
  data: ILogInActionForm
): Promise<APIResponse> {
  const { email, password } = data;

  try {
    await connectDB();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return handleAPIResponse(false, 404, "User not found", null, [
        "User with this email does not exist.",
      ]);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleAPIResponse(false, 401, "Invalid credentials", null, [
        "Incorrect email or password.",
      ]);
    }

    const token = await new SignJWT({ userId: user._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(JWT_SECRET_BUFFER);

    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });
    const plainUser = user.toObject();

    const responseData: Partial<IUser> = {
      _id: plainUser._id.toString(),
      email: plainUser.email,
      is_deleted: false,
      username: plainUser.username,
    };
    return handleAPIResponse(true, 200, "Login successful", responseData);
  } catch (error) {
    console.error("Login error:", error);
    return handleAPIResponse(
      false,
      500,
      "An error occurred during login",
      null,
      [error || "Internal server error"]
    );
  }
}

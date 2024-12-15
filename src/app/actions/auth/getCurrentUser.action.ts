"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import UserModel, { IUser } from "@/model/user.model";
import { connectDB } from "@/db/mongoDB";
import { handleAPIResponse, APIResponse } from "@/utils/APIHandleResponse.util";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_BUFFER = new TextEncoder().encode(JWT_SECRET);

export async function getCurrentUser(): Promise<APIResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  if (!token) return handleAPIResponse(false, 401, "User not authenticated");

  try {
    const tokenValue = token.value;
    const { payload } = await jwtVerify(tokenValue, JWT_SECRET_BUFFER);
    if (!payload) {
      cookieStore.delete("auth_token");
      return handleAPIResponse(false, 401, "Invalid token");
    }
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      cookieStore.delete("auth_token");
      return handleAPIResponse(false, 401, "Token expired");
    }

    await connectDB();
    const user = await UserModel.findById(payload.userId);
    if (!user) return handleAPIResponse(false, 404, "User not found");
    const plainUser = user.toObject();
    const data: Partial<IUser> = {
      _id: plainUser._id.toString(),
      email: plainUser.email,
      username: plainUser.username,
      is_deleted: plainUser.is_deleted,
      createdAt: plainUser.createdAt,
      updatedAt: plainUser.updatedAt,
    };
    return handleAPIResponse(true, 200, "User authenticated", data);
  } catch (error) {
    console.error("Error getting current user:", error);
    cookieStore.delete("token");
    return handleAPIResponse(
      false,
      500,
      "An error occurred while fetching user data",
      null,
      [error || "Internal server error"]
    );
  }
}

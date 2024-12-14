"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "@/model/user.model";
import { connectDB } from "@/db/mongoDB";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface ILogInActionForm {
  email: string;
  password: string;
}
export async function loginAction(
  data: ILogInActionForm
): Promise<Partial<IUser>> {
  const { email, password } = data;

  try {
    await connectDB();

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });
    const plainUser = user.toObject();

    const data: Partial<IUser> = {
      _id: plainUser._id.toString(),
      email: plainUser.email,
      is_deleted: false,
      username: plainUser.username,
    };

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

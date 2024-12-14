"use server";

import bcrypt from "bcrypt";
import UserModel, { IUser } from "@/model/user.model";
import { connectDB } from "@/db/mongoDB";

export interface ISignUpActionForm {
  email: string;
  username: string;
  password: string;
}
export async function signUpAction(
  data: ISignUpActionForm
): Promise<Partial<IUser>> {
  const { email, password, username } = data;
  try {
    await connectDB();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const plainUser = newUser.toObject();

    const data: Partial<IUser> = {
      _id: plainUser._id.toString(),
      email: plainUser.email,
      is_deleted: false,
      username: plainUser.username,
    };

    return data;
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
}

import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  _id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  email: string;
  username: string;
  password: string;
  googleId?: string;
  is_deleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
    is_deleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;

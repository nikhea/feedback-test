"use client";

import { useGetUser } from "@/hooks/auth/useGetCurrentUser";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const Header = () => {
  const { user, UserLoadSuccess } = useGetUser();

  return (
    <div className=" bg-slate-100 w-full flex justify-between px-10 py-5">
      <div>{UserLoadSuccess && user?.email}</div>
      <br />
      {user?.email ? (
        <div className="   flex gap-4 ">
          <Link href="/posts">Go to Posts</Link>
          <Link href="/dashboard">Go to dashboard</Link>
          <Link href="/posts/audioPlayer">Go to music</Link>

          <LogoutButton />
        </div>
      ) : (
        <div>
          <Link href="/login">Go to Login</Link>
          <Link href="/register">Go to register</Link>
        </div>
      )}
    </div>
  );
};

export default Header;

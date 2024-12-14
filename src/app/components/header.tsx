"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "../actions/auth/logOut.action";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogOut = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
    await queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
  };

  return (
    <div>
      <Link href="/posts"> go to post</Link>
      <br />
      <Link href="/login">go to login</Link>
      <button className=" block" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Header;

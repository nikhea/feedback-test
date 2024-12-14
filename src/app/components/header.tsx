"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookie } from "react-use";

const Header = () => {
  const router = useRouter();

  const [authToken, , deleteCookie] = useCookie("auth_token");

  const handleLogOut = async () => {
    deleteCookie();
    router.push("/login");
  };

  return (
    <div>
      <div>{authToken}</div>
      <Link href="/posts"> go to post</Link>
      <Link href="/login"> go to login</Link>

      <button className=" block" onClick={handleLogOut}>
        {" "}
        Log Out
      </button>
    </div>
  );
};

export default Header;

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useCookie } from "react-use";
import { logoutAction } from "../actions/auth/logOut.action";

const Header = () => {
  const router = useRouter();

  // const [authToken] = useCookie("auth_token");

  const handleLogOut = async () => {
    await logoutAction();
    router.push("/login");
  };

  return (
    <div>
      {/* <div>token:{authToken}</div> */}
      <Link href="/posts"> go to post</Link>
      <Link href="/login" onClick={handleLogOut}>
        {" "}
        go to login
      </Link>

      <button className=" block" onClick={handleLogOut}>
        {" "}
        Log Out
      </button>
    </div>
  );
};

export default Header;

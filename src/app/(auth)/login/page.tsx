"use client";
import { loginAction } from "@/app/actions/auth/LogIn.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useCookie } from "react-use";
import { useQueryState } from "nuqs";

export default function Login() {
  // const [authToken, updateCookie] = useCookie("auth_token");
  const [name] = useQueryState("from");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginAction({ email, password });
      console.log(data);

      if (data.email) {
        // updateCookie("123456");
        const redirectTo = name || "/";
        router.push(redirectTo);
      }
    } catch (err) {
      console.log(err);
      setError(`${err}`);
    }
  };
  // password  frontlimitedevent442
  return (
    <div>
      {/* <p>Cookie Value: {authToken || "No cookie set"}</p> */}

      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// const handleLogin = async () => {
//   try {
//     updateCookie("123456");
//     const redirectTo = name || "/";

//     //   const redirectTo = searchParams.get("from") || "/";
//     router.push(redirectTo);
//   } catch (err) {
//     console.log(err);
//     setError("Login failed");
//   }
// };

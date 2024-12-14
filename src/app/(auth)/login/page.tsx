"use client";
import { loginAction } from "@/app/actions/auth/LogIn.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useQueryClient } from "@tanstack/react-query";
export default function Login() {
  const [name] = useQueryState("from");
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginAction({ email, password });
      if (data.success === true) {
        const redirectTo = name || "/";
        router.push(redirectTo);
        router.refresh();
        await queryClient.invalidateQueries({
          queryKey: ["authenticated-user"],
        });
      }
    } catch (err) {
      console.log(err);
      setError(`${err}`);
    }
  };
  return (
    <div>
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

// password  frontlimitedevent442

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

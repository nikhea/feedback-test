"use client";
import GoogleButton from "@/app/components/googleButton";
import { useLoginUser } from "@/hooks/auth/useLoginUser";
import { useState } from "react";

export default function Login() {
  const loginMutation = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async () => {
    loginMutation.mutate({
      email,
      password,
    });
    // try {

    // } catch (err) {
    //   console.log(err);
    //   setError(`${err}`);
    // }
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleButton />

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
      <button onClick={handleLogin}>
        {loginMutation.isPending ? <>loading</> : <>Login</>}
      </button>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
}

// const handleLogin = async () => {
//   try {
//     const data = await loginAction({ email, password });
//     if (data.success === true) {
//       const redirectTo = name || "/";
//       router.push(redirectTo);
//       router.refresh();
//       await queryClient.invalidateQueries({
//         queryKey: ["authenticated-user"],
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     setError(`${err}`);
//   }
// };
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

"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/actions/auth/sginUp.action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signUpAction({ email, password, username });
      console.log(data);
      // if (data.email) {
      //   router.push("/login");
      // }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setError(`${err}`);
    }
  };

  return (
    <div>
      <h1>SignUP</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

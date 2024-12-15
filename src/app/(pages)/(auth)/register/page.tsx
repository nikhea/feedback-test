"use client";
import { useState } from "react";
import { useRegisterUser } from "@/hooks/auth/useRegisterUser";

export default function Login() {
  const registerMutation = useRegisterUser();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, username });
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
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
}

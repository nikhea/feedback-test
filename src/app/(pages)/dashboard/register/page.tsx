import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow text-center">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <p className="mb-6">
        Welcome to our multi-step registration process. Please click the button
        below to begin.
      </p>
      <Link href="/dashboard/register/basic-details">
        <Button>Start Registration</Button>
      </Link>
    </div>
  );
}

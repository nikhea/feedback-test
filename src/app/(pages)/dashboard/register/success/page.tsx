"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useLocalStorage } from "react-use";

export default function SuccessPage() {
  const { reset } = useFormContext();
  const [, , removeStepCompletion] = useLocalStorage(
    "registrationStepCompletion"
  );

  useEffect(() => {
    // Clear the form data
    reset();
    localStorage.removeItem("registrationForm");
    removeStepCompletion();
  }, [reset, removeStepCompletion]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
      <p className="mb-6">
        Thank you for registering. Your account has been created successfully.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}

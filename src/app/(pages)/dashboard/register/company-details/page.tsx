"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLocalStorage } from "react-use";

type CompanyDetailsFormData = {
  companyName: string;
  companySize: string;
};

export default function CompanyDetails() {
  const router = useRouter();
  const { control, handleSubmit } = useFormContext<CompanyDetailsFormData>();
  const [, setStepCompletion] = useLocalStorage(
    "registrationStepCompletion",
    {}
  );

  const onSubmit = (data: CompanyDetailsFormData) => {
    console.log(data);
    setStepCompletion((prev) => ({ ...prev, "company-details": true }));
    router.push("/register/invite-team");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Company Details</h2>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="companyName"
            rules={{ required: "Company name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companySize"
            rules={{ required: "Company size is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/register/basic-details")}
            >
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

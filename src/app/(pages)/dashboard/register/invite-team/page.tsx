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

type InviteTeamFormData = {
  teamMemberEmail: string;
};

export default function InviteTeam() {
  const router = useRouter();
  const { control, handleSubmit, getValues } =
    useFormContext<InviteTeamFormData>();
  const [, setStepCompletion] = useLocalStorage(
    "registrationStepCompletion",
    {}
  );

  const onSubmit = (data: InviteTeamFormData) => {
    console.log(data);
    setStepCompletion((prev) => ({ ...prev, "invite-team": true }));
    console.log("Form submitted:", getValues());
    router.push("/register/success");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Invite Your Team</h2>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="teamMemberEmail"
            rules={{
              required: "Team member email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Member Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/register/company-details")}
            >
              Previous
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

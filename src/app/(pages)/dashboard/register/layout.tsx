"use client";

import { useRouter, usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { StepIndicator } from "../../../components/steeper";
import { useLocalStorage } from "react-use";
import useFormPersist from "react-hook-form-persist";

const steps = [
  {
    title: "Your details",
    description: "Provide your basic information",
    path: "/register/basic-details",
  },
  {
    title: "Company details",
    description: "Tell us about your company",
    path: "/register/company-details",
  },
  {
    title: "Invite your team",
    description: "Start collaborating with your team",
    path: "/register/invite-team",
  },
];

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const methods = useForm();
  const [stepCompletion] = useLocalStorage("registrationStepCompletion", {
    "basic-details": false,
    "company-details": false,
    "invite-team": false,
  });

  useFormPersist("registrationForm", {
    watch: methods.watch,
    setValue: methods.setValue,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);
  const showStepIndicator = currentStepIndex !== -1;

  const handleStepClick = (index: number) => {
    const targetStep = steps[index].path
      .split("/")
      .pop() as keyof typeof stepCompletion;

    // @ts-expect-error stepCompletion can be possible undfine
    if (index < currentStepIndex || stepCompletion[targetStep]) {
      router.push(steps[index].path);
    }
  };

  //   const updateStepCompletion = (step: keyof typeof stepCompletion, completed: boolean) => {
  //     setStepCompletion(prev => ({ ...prev, [step]: completed }))
  //   }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {showStepIndicator && (
            <div className="mb-8">
              <StepIndicator
                steps={steps}
                currentStep={currentStepIndex}
                variant="horizontal"
                onStepClick={handleStepClick}
              />
            </div>
          )}
          {children}
        </div>
      </div>
    </FormProvider>
  );
}

"use client";

import { usePathname } from "next/navigation";
// import useFormStore from '../store/formStore'
import { useEffect, useState } from "react";

import Analytics from "@/app/components/dashboard/analytics";
import Cost from "@/app/components/dashboard/cost";
import { StepIndicator } from "@/app/components/steeper";
import React, { Suspense } from "react";

const steps = [
  {
    title: "Your details",
    description: "Provide your name and email address",
    path: "/register/step1",
  },
  {
    title: "Company details",
    description: "A few details about your company",
    path: "/register/step2",
  },
  {
    title: "Invite your team",
    description: "Start collaborating with your team",
    path: "/register/step3",
  },
  {
    title: "Company details",
    description: "A few details about your company",
    path: "/register/step2",
  },
  {
    title: "Your details",
    description: "Provide your name and email address",
    path: "/register/step1",
  },
  {
    title: "Invite your team",
    description: "Start collaborating with your team",
    path: "/register/step3",
  },
];

const Page = () => {
  // const router = useRouter()
  const pathname = usePathname();
  // const { stepCompletion } = useFormStore()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  const handleStepClick = (index: number) => {
    console.log(index);

    // if (index < currentStepIndex || stepCompletion[`step${index + 1}` as keyof typeof stepCompletion]) {
    //   router.push(steps[index].path)
    // }
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div>
      dashbodard page
      <Suspense fallback={<p>loading analytics</p>}>
        <Analytics />
      </Suspense>
      <Suspense fallback={<p>loading COST</p>}>
        <Cost />
      </Suspense>
      <StepIndicator
        steps={steps}
        currentStep={currentStepIndex}
        variant="horizontal"
        onStepClick={handleStepClick}
      />
    </div>
  );
};

export default Page;

"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  variant?: "vertical" | "horizontal";
  onStepClick?: (index: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  className,
  variant = "vertical",
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "w-full",
        variant === "vertical"
          ? "space-y-4"
          : "flex justify-between items-start ",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isCurrent = currentStep === index;
        const isUpcoming = currentStep < index;

        return (
          <div
            key={step.title}
            className={cn(
              "relative",
              variant === "vertical" ? "pl-8" : "flex-1",
              "cursor-pointer"
            )}
            onClick={() => onStepClick && onStepClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onStepClick && onStepClick(index);
              }
            }}
          >
            {/* Progress Line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute",
                  variant === "vertical"
                    ? "left-[15px] top-[30px] h-[calc(100%-14px)] w-[2px]"
                    : "left-[30px] top-[15px] w-[calc(100%-30px)] h-[2px]",
                  "bg-gray-800",
                  {
                    "bg-gradient-to-b from-white to-gray-800":
                      variant === "vertical" && isCurrent,
                    "bg-white": isCompleted,
                    "bg-gradient-to-r from-white to-gray-800":
                      variant === "horizontal" && isCurrent,
                  }
                )}
              />
            )}

            {/* Step Indicator */}
            <div className="relative flex items-start gap-3">
              <div
                className={cn(
                  "relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2",
                  {
                    "border-white bg-white text-black": isCompleted,
                    "border-white bg-transparent": isCurrent,
                    "border-gray-800 bg-transparent": isUpcoming,
                  },
                  "transition-colors hover:bg-gray-800"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <div
                    className={cn("h-2 w-2 rounded-full", {
                      "bg-white": isCurrent,
                      "bg-gray-800": isUpcoming,
                    })}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn("text-sm font-medium", {
                    "text-white": isCompleted || isCurrent,
                    "text-gray-500": isUpcoming,
                  })}
                >
                  {step.title}
                </span>
                <span
                  className={cn("text-sm", {
                    "text-gray-300": isCompleted || isCurrent,
                    "text-gray-600": isUpcoming,
                  })}
                >
                  {step.description}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

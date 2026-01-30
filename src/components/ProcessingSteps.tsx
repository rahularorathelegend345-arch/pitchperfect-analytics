import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStepsProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, label: "Fetching current market rates", duration: 1500 },
  { id: 2, label: "Calculating brokerage costs", duration: 1200 },
  { id: 3, label: "Estimating ROI and returns", duration: 1800 },
  { id: 4, label: "Generating market insights", duration: 2000 },
  { id: 5, label: "Designing presentation slides", duration: 1500 },
];

const ProcessingSteps = ({ onComplete }: ProcessingStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep >= steps.length) {
      // All steps complete
      setTimeout(() => {
        onComplete();
      }, 500);
      return;
    }

    const step = steps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, step.id]);
      setCurrentStep((prev) => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Analyzing Market Data
          </h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we generate your pitch
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStep === index;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg transition-all duration-300",
                  isCompleted && "bg-success/5",
                  isActive && "bg-primary/5",
                  !isCompleted && !isActive && "opacity-50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isCompleted && "bg-success text-success-foreground animate-step-complete",
                    isActive && "bg-primary text-primary-foreground",
                    !isCompleted && !isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium transition-colors",
                    isCompleted && "text-success",
                    isActive && "text-foreground",
                    !isCompleted && !isActive && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;

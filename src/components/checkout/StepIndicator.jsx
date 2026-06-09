import { Check } from 'lucide-react';

const steps = ['Delivery', 'Payment', 'Review & Confirm'];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                  isComplete
                    ? 'bg-darktext border-darktext text-lighttext'
                    : isActive
                      ? 'bg-gold border-gold text-darktext'
                      : 'bg-transparent border-beige-dark text-beige-muted'
                }`}
              >
                {isComplete ? <Check className="w-5 h-5 text-gold" /> : stepNum}
              </div>
              <span className={`text-xs mt-2 hidden sm:block ${isActive ? 'text-darktext font-medium' : 'text-beige-muted'}`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 ${isComplete || isActive ? 'bg-gold' : 'bg-beige-dark'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

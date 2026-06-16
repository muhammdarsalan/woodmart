export default function StepIndicator({ step }) {
  const steps = ['Delivery Info', 'Payment Method', 'Review & Confirm'];
  return (
    <div className="mb-8 grid gap-3 md:grid-cols-3">
      {steps.map((label, index) => (
        <div key={label} className={'border px-4 py-3 text-sm ' + (step === index + 1 ? 'border-primary bg-primary text-white' : step > index + 1 ? 'border-primary bg-white text-primary' : 'border-border-light text-secondary')}>
          <span className="font-semibold">Step {index + 1}</span> - {label}
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

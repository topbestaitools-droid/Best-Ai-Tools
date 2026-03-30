import { clsx } from "clsx";

export function Pill({
  children,
  variant = "solid"
}: {
  children: React.ReactNode;
  variant?: "solid" | "soft";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs border",
        variant === "solid" && "bg-bg border-border text-muted",
        variant === "soft" && "bg-primary/15 border-primary/30 text-text"
      )}
    >
      {children}
    </span>
  );
}

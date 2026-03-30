import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition border";
  const variants: Record<string, string> = {
    primary: "bg-primary/20 border-primary/40 hover:bg-primary/30",
    secondary: "bg-accent/15 border-accent/30 hover:bg-accent/25",
    ghost: "bg-transparent border-transparent hover:border-border hover:bg-panel"
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

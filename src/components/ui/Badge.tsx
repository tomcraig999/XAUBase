import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "green" | "red";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-dark-700 text-dark-200": variant === "default",
          "bg-gold-900/50 text-gold-400 border border-gold-700/50": variant === "gold",
          "bg-green-900/50 text-green-400": variant === "green",
          "bg-red-900/50 text-red-400": variant === "red",
        },
        className
      )}
      {...props}
    />
  );
}

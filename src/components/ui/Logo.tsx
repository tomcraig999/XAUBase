import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  linkTo?: string;
}

export default function Logo({ size = "md", className, linkTo = "/" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-7 w-7", iconText: "text-[10px]", text: "text-lg", spacing: "tracking-[0.15em]", gap: "gap-2.5" },
    md: { icon: "h-9 w-9", iconText: "text-xs", text: "text-xl", spacing: "tracking-[0.15em]", gap: "gap-3" },
    lg: { icon: "h-12 w-12", iconText: "text-sm", text: "text-3xl", spacing: "tracking-[0.2em]", gap: "gap-4" },
  };

  const s = sizes[size];

  const content = (
    <div className={cn("flex items-center", s.gap, className)}>
      {/* Icon - refined hexagonal gold element badge */}
      <div className="relative">
        <div
          className={cn(
            s.icon,
            "flex items-center justify-center rounded-lg border border-gold-400/30 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 shadow-[0_0_12px_rgba(212,160,23,0.25)]"
          )}
        >
          <span className={cn(s.iconText, "font-bold text-dark-900 leading-none")}>
            Au
          </span>
        </div>
        {/* Subtle corner accent */}
        <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold-300/60" />
      </div>

      {/* Wordmark */}
      <div className="flex items-baseline">
        <span
          className={cn(
            s.text,
            s.spacing,
            "font-bold uppercase leading-none"
          )}
          style={{
            background: "linear-gradient(135deg, #FFD11A 0%, #D4A017 40%, #B8860B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          XAU
        </span>
        <span
          className={cn(
            s.text,
            "tracking-[0.08em] font-light uppercase leading-none text-dark-100"
          )}
        >
          BASE
        </span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

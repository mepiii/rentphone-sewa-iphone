import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as ShadcnButton } from "./ui/button";
import { cn } from "./ui/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: { variant?: Variant; size?: Size; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-11 px-5 text-[14px]",
    lg: "h-[54px] px-7 text-[16px]",
  };
  const variants: Record<Variant, string> = {
    primary: "rp-grad-bg text-white hover:brightness-[1.04]",
    secondary: "border border-[var(--rp-border)] bg-transparent text-[var(--rp-deep)] hover:border-[var(--rp-deep)]/40 hover:bg-transparent",
    ghost: "bg-transparent text-[var(--rp-deep)] hover:bg-[var(--rp-deep)]/[0.06]",
    outline: "border border-white/45 bg-transparent text-white hover:bg-white/10",
  };

  return (
    <ShadcnButton
      {...rest}
      variant="ghost"
      className={cn(
        "rounded-[var(--rp-radius-button)] font-medium tracking-[-0.01em] transition duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rp-deep)]",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
    </ShadcnButton>
  );
}

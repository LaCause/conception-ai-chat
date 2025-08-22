"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean; // full width
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[--primary] text-[--primary-contrast] hover:brightness-110 dark:hover:brightness-125",
  secondary:
    "border border-black/10 bg-[--elev]/80 text-[--fg] hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10",
  ghost: "text-[--fg] hover:bg-black/5 dark:hover:bg-white/10",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      iconLeft,
      iconRight,
      block,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium transition-[background,transform] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:glow-outline",
          "disabled:opacity-50 disabled:pointer-events-none",
          VARIANT[variant],
          SIZE[size],
          block && "w-full",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <>
            {iconLeft && <span className="shrink-0">{iconLeft}</span>}
            {children && <span>{children}</span>}
            {iconRight && <span className="shrink-0">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

export default Button;

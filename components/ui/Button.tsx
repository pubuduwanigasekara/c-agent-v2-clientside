"use client";

import { cn } from "@/lib/utills";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-70",
        variant === "primary" &&
          "bg-[#ef660f] text-white hover:bg-[#ef660f]/80 ring-1 ring-white/10",
        variant === "secondary" && "bg-slate-800 text-white hover:bg-slate-700",
        variant === "outline" &&
          "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className,
      )}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}

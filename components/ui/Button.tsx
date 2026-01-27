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
          "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20",
        variant === "secondary" && "bg-slate-800 text-white hover:bg-slate-700",
        variant === "outline" &&
          "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className,
      )}
      {...props}>
      {loading ? "Processing..." : children}
    </button>
  );
}

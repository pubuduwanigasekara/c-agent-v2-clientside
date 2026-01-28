import { cn } from "@/lib/utills";
import { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-slate-900 border-slate-800 text-slate-200 p-5",
        className,
      )}>
      {children}
    </div>
  );
}

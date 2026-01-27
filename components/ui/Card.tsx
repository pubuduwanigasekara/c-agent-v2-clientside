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
    <div className={cn("rounded-xl border bg-white  p-5", className)}>
      {children}
    </div>
  );
}

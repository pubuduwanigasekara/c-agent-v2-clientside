import { cn } from "@/lib/utills";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "outline";
  className?: string; // Support className for flexibility
}) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded-md text-xs font-medium inline-flex items-center",
        variant === "default" && "bg-slate-800 text-slate-200",
        variant === "success" &&
          "bg-emerald-900/30 text-emerald-400 border border-emerald-900/50",
        variant === "warning" &&
          "bg-yellow-900/30 text-yellow-500 border border-yellow-900/50",
        variant === "outline" && "border border-slate-600 text-slate-300",
        className,
      )}>
      {children}
    </span>
  );
}

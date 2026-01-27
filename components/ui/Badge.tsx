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
        variant === "default" && "bg-gray-200 text-black",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "warning" && "bg-yellow-100 text-yellow-700",
        variant === "outline" && "border border-gray-300 text-gray-700",
        className
      )}
    >
      {children}
    </span>
  );
}

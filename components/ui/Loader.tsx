import { cn } from "@/lib/utills";

export function Loader({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent",
          className
        )}
      />
    </div>
  );
}

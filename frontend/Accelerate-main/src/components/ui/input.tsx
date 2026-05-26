import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export function Input({
  className,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: boolean }) {
  return (
    <div className="relative">
      {icon && (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
      )}
      <input
        className={cn(
          "flex h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]",
          icon && "pl-9",
          className
        )}
        {...props}
      />
    </div>
  );
}

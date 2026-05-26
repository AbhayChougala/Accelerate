import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
  outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--surface)]",
  ghost: "hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]",
  secondary: "bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--border-subtle)]",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
  icon: "h-9 w-9",
};

export function Button({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

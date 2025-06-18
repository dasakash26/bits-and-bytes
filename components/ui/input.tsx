import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles with consistent spacing and modern design
        "flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm transition-all duration-200 outline-none",
        // File input styles with consistent spacing
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:mr-3",
        // Placeholder and selection styles
        "placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary-foreground",
        // Color scheme specific with better contrast
        "border-input bg-background dark:bg-background/50",
        // Focus states with consistent ring system (3px ring, soft glow)
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-0",
        // Error states with proper contrast
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Hover states for better interactivity
        "hover:border-input/80 hover:shadow-md",
        // Disabled states with consistent opacity
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        // Responsive and accessibility improvements
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };

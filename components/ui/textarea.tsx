import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles with consistent spacing to match input
        "flex min-h-20 w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm transition-all duration-200 outline-none resize-y",
        // Color scheme specific with better contrast
        "border-input bg-background dark:bg-background/50",
        // Placeholder styles
        "placeholder:text-muted-foreground",
        // Focus states with consistent ring system (matches input)
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-0",
        // Error states with proper contrast
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Hover states for better interactivity
        "hover:border-input/80 hover:shadow-md",
        // Disabled states with consistent opacity
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        // Responsive and accessibility improvements
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };

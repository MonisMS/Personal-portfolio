import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border bg-bg-primary px-3 py-2 text-base text-text-primary transition-colors placeholder:text-text-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y",
          error
            ? "border-destructive focus-visible:ring-destructive/50"
            : "border-border",
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

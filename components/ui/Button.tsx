import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "default" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none font-medium transition-all duration-300 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          {
            "bg-radiance-navy text-radiance-white hover:bg-radiance-navy/90 focus-visible:ring-radiance-navy":
              variant === "primary",
            "border-2 border-radiance-navy text-radiance-navy hover:bg-radiance-navy hover:text-radiance-white focus-visible:ring-radiance-navy":
              variant === "outline",
            "px-6 py-3 text-sm tracking-wide uppercase": size === "default",
            "px-8 py-4 text-base tracking-wide uppercase": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

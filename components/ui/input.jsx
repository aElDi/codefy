import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded-md border border-input bg-white bg-opacity-75 px-2 py-1 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 right-2 flex items-center">
          {icon}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };

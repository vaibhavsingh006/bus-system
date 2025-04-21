import React from "react";

const Alert = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseClasses = "relative w-full rounded-lg border p-4";
  const variantClasses = {
    default: "bg-white text-black border-gray-300",
    destructive: "border-red-500 text-red-700 dark:border-red-600"
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5 ref={ref} className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm leading-relaxed ${className}`} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
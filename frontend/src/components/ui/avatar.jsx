import React from "react";
import { Root as AvatarRoot, Image as AvatarImg, Fallback as AvatarFallbackComp } from "@radix-ui/react-avatar";

const Avatar = React.forwardRef(({ className = "", ...props }, ref) => (
  <AvatarRoot
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className = "", ...props }, ref) => (
  <AvatarImg ref={ref} className={`aspect-square h-full w-full ${className}`} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className = "", ...props }, ref) => (
  <AvatarFallbackComp
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };

import React, { useState, useEffect, cloneElement, Children } from "react";

// Main DropdownMenu Component
const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            {Children.map(children, (child) => {
                if (child?.type?.displayName === "DropdownMenuTrigger") {
                    return cloneElement(child, { onClick: () => setOpen(!open) });
                }
                if (child?.type?.displayName === "DropdownMenuContent") {
                    return open ? cloneElement(child, { onClose: () => setOpen(false) }) : null;
                }
                return child;
            })}
        </div>
    );
};
DropdownMenu.displayName = "DropdownMenu";

// Trigger Component
const DropdownMenuTrigger = ({ children, asChild = false, onClick }) => {
    if (asChild && React.isValidElement(children)) {
        return cloneElement(children, { onClick });
    }
    return <button onClick={onClick}>{children}</button>;
};
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// Content Component
const DropdownMenuContent = ({
    children,
    align = "center",
    className = "",
    onClose,
    ...props
}) => {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest("[data-dropdown-content]")) {
                onClose();
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [onClose]);

    const alignClasses = {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0",
    };

    const alignClass = alignClasses[align] || alignClasses.center;

    return (
        <div
            className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${alignClass} ${className}`}
            data-dropdown-content
            {...props}
        >
            {children}
        </div>
    );
};
DropdownMenuContent.displayName = "DropdownMenuContent";

// Item Component
const DropdownMenuItem = ({ className = "", ...props }) => {
    return (
        <button
            className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left ${className}`}
            {...props}
        />
    );
};
DropdownMenuItem.displayName = "DropdownMenuItem";

// Separator Component
const DropdownMenuSeparator = ({ className = "", ...props }) => {
    return <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />;
};
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// Export all components
export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
};

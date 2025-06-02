import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const chipStyles = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "px-4",
        "py-2",
        "rounded-full",
        "font-medium",
        "text-sm",
        "cursor-pointer",
        "select-none",
        "border",
        "transition-colors",
        "duration-200",
    ],
    {
        variants: {
            variant: {
                solid: "bg-gray-200 text-gray-800",
                outline: "bg-transparent text-gray-800 border-gray-300",
                ghost: "bg-transparent text-gray-800",
            },
            size: {
                sm: "px-3 py-1 text-xs",
                md: "px-4 py-2 text-sm",
                lg: "px-6 py-3 text-base",
            },
            colorscheme: {
                gray: "text-gray-800 bg-gray-200 hover:bg-gray-300",
                blue: "text-blue-800 bg-blue-200 hover:bg-blue-300",
                red: "text-red-800 bg-red-200 hover:bg-red-300",
                green: "text-green-800 bg-green-200 hover:bg-green-300",
            },
        },
        compoundVariants: [
            {
                variant: "outline",
                colorscheme: "gray",
                className: "border-gray-300 hover:bg-gray-100",
            },
            {
                variant: "outline",
                colorscheme: "blue",
                className: "border-blue-300 hover:bg-blue-100",
            },
            {
                variant: "ghost",
                colorscheme: "red",
                className: "hover:bg-red-100",
            },
        ],
        defaultVariants: {
            variant: "solid",
            size: "md",
            colorscheme: "gray",
        },
    }
);

type ChipProps = ComponentProps<"div"> &
    VariantProps<typeof chipStyles> & {
        icon?: React.ReactNode; // Optional icon
        iconPosition?: "start" | "end"; // Position of the icon
        onDelete?: () => void; // Callback for delete action
    };

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
    (
        { variant, size, colorscheme, icon, iconPosition, className, children, onDelete, ...props },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(chipStyles({ variant, size, colorscheme, className }))}
                {...props}
            >
                {/* Icon at the start */}
                {icon && iconPosition === "start" && (
                    <span className="mr-2 flex items-center">{icon}</span>
                )}

                {/* Chip content */}
                <span>{children}</span>

                {/* Icon at the end */}
                {icon && iconPosition === "end" && (
                    <span className="ml-2 flex items-center">{icon}</span>
                )}

                {/* Delete button */}
                {onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                )}
            </div>
        );
    }
);

Chip.displayName = "Chip";

import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const BadgeStyles = cva(["absolute", "flex", "items-center", "justify-center"], {
    variants: {
        position: {
            top: "-top-3 left-1/2 -translate-x-1/2",
            left: "-left-3 top-1/2 -translate-y-1/2",
            bottom: "-bottom-3 left-1/2 -translate-x-1/2",
            right: "-right-3 top-1/2 -translate-y-1/2",
            topLeft: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
            topRight: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
            bottomLeft: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
            bottomRight: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
        },
        color: {
            primary: "bg-blue-300 text-white",
            secondary: "bg-gray-900 text-white",
            error: "bg-red-500 text-white",
            success: "bg-green-400 text-white",
        },
        size: {
            sm: "min-w-2.5 min-h-2.5 text-xs",
            md: "min-w-3 min-h-3 text-sm",
            lg: "min-w-4 min-h-4 text-base",
            xl: "min-w-5 min-h-5 text-lg",
        },
    },
    defaultVariants: {
        position: "topRight",
        color: "primary",
        size: "md",
    },
});

type BadgeProps = ComponentProps<"div"> &
    VariantProps<typeof BadgeStyles> & {
        badgeContent?: number | string;
        badgeStyle?: string;
    };

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            badgeContent,
            badgeStyle,
            position = "topRight",
            color = "primary",
            size = "md",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className="relative inline-flex items-center justify-center"
                {...props}
            >
                {children}
                {badgeContent ? (
                    <span
                        className={cn(
                            BadgeStyles({ position, color, size }),
                            "rounded-full font-medium px-1.5 py-0.5 transition-transform duration-[200s] leading-[1.2] ease-in-out",
                            badgeStyle
                        )}
                    >
                        {badgeContent}
                    </span>
                ) : (<span
                    className={cn(
                        BadgeStyles({ position, color, size }),
                        "rounded-full font-medium transition-transform duration-[200s] leading-[0] ease-in-out",
                        badgeStyle
                    )}
                ></span>)}
            </div>
        );
    }
);

Badge.displayName = "Badge";

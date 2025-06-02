import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const buttonStyles = cva(
    [
        "w-auto",
        "rounded-md",
        "font-semibold",
        "flex",
        "justify-center",
        "relative",
        "items-center",
        "focus:outline-none",
        "disabled:cursor-not-allowed",
        "min-w-44"
    ],
    {
        variants: {
            variant: {
                solid: "",
                outline: "border-2",
                ghost: "transition-colors duration-300",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                md: "px-4 py-2 text-base",
                lg: "px-6 py-3 text-lg",
            },
            colorscheme: {
                primary: "text-white",
            },
        },
        compoundVariants: [
            {
                variant: "solid",
                colorscheme: "primary",
                className: "bg-blue-500 hover:bg-blue-600",
            },
            {
                variant: "outline",
                colorscheme: "primary",
                className:
                    "text-blue-600 border-blue-500 bg-transparent hover:bg-blue-100",
            },
            {
                variant: "ghost",
                colorscheme: "primary",
                className: "text-blue-600 bg-transparent hover:bg-blue-100",
            },
        ],
        defaultVariants: {
            variant: "solid",
            size: "md",
            colorscheme: "primary",
        },
    }
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles> & {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, colorscheme, icon, iconPosition, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonStyles({ variant, size, colorscheme, className }))}
                {...props}
            >

                {
                    icon ? (
                        <span className={` absolute top-1/2 -translate-y-1/2 leading-[0] ${iconPosition === "start" ? " left-1.5 " : iconPosition === "end" ? "right-1.5" : "right-1.5 "} `}>{icon}</span>
                    ) : null
                }
                <span className={` inline-block text-[inherit] font-[inherit] leading-4  ${iconPosition === "start" ? " pl-3.5 " : iconPosition === "end" ? "pr-3.5" : icon ? "pr-3.5" : ""}`}>{props.children}</span>



            </button>
        );
    }
);
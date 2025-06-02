import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, ImgHTMLAttributes } from "react";

const AvatarStyles = cva([
    "w-full",
    "transition-all",
    "duration-100",
    "outline-none",
    "flex",
    "font-semibold",
    "leading-[0]",
    "items-center",
    "justify-center",
    "leading-[0]",
    " rounded-full",
    "overflow-hidden"
],
    {
        variants: {
            variant: {
                primary: "text-white bg-slate-900",
                secondary: "text-black bg-slate-300",
                disable: "pointer-events-none bg-gray-100 text-gray-500 cursor-not-allowed"

            },
            size: {
                sm: " size-12 min-h-12 min-w-12 text-sm",
                md: " size-16 min-h-16 min-w-16 text-2xl",
                lg: " size-20 min-h-20 min-w-20 text-3xl",
            },
        },
        compoundVariants: [
            {
                variant: "primary",
            },
            {
                variant: "secondary",
            },
            {
                variant: "disable",
            },
        ],
        defaultVariants: {
            size: "md",
            variant: "primary",
        },
    });

type AvatarProps = ComponentProps<"div"> &
    VariantProps<typeof AvatarStyles> & {
        imgProps?: ImgHTMLAttributes<HTMLImageElement>;
        avatarstyleWrapper?: string | undefined;
        title?: string;

    };

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ imgProps, avatarstyleWrapper, title, variant, size, ...props }, ref) => {
        const displayTitle = title ? title.charAt(0).toUpperCase() : null;


        return (
            <div
                ref={ref}
                className={cn(AvatarStyles({ variant, size }), avatarstyleWrapper)}
                {...props}
            >
                {imgProps?.src ? (
                    <img
                        src={imgProps.src}
                        alt={imgProps.alt || "Avatar"}
                        {...imgProps}

                        className={cn(imgProps.className, "rounded-full w-full h-full object-cover")}
                    />
                ) : displayTitle ? (
                    <span className="font-[inherit] leading-[inherit] text-inherit">
                        {displayTitle}
                    </span>
                ) : <span className="font-[inherit] leading-[inherit] text-inherit">
                    N
                </span>}
            </div>
        );
    }
);


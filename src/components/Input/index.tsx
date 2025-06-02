import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";


// input field outerdiv style 
const containerStyles = cva(
    ["relative",
        "w-full",
        "transition-all",
        "duration-100",
    ],
    {
        variants: {
            variant: {
                outline: " bg-transparent ",
                filled: "",
                standard: " relative before:absolute before:bottom-0 before:left-0 before:w-full before:bg-black h-[1px]  ",
                disable: " pointer-events-none",
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
);
// input field style 
const inputStyles = cva(
    [
        "w-full",
        "p-2",
        "rounded-lg",
        "transition-all",
        "border-transparent",
        "duration-100",
        "outline-none",
        "focus:outline-slate-700",
        "focus:border-transparent",
        "placeholder:text-gray-400",
        "placeholder:text-base",
        "text-slate-700"
    ],
    {
        variants: {
            variant: {
                outline: "border border-gray-300",
                filled: "bg-gray-200 pt-3 pb-1",
                standard: "",
                disable: "pointer-events-none opacity-30",
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
);
// label style 
const labelStyle = cva(
    ["inline-block", "text-sm", "pointer-events-none", "font-medium", "text-gray-700", "absolute", "z-10", "transition-transform", "transition-all", "duration-75"],
    {
        variants: {
            variant: {
                outline: "-top-2 left-0.5 leading-[1] scale-90 px-1 bg-white",
                filled: "top-0.5 left-0.5 leading-[1] scale-90 px-1 bg-transparent ",
                standard: "-top-2 left-0.5 leading-[1] scale-90 px-1 bg-white",
                disable: "-top-2 left-0.5 leading-[1] scale-90 px-1 bg-white",
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
);

const activelabelStyle = cva(
    ["inline-block", "text-sm", "pointer-events-none", "font-medium", "text-gray-700", "absolute", "z-10", "transition-all", "duration-75"],
    {
        variants: {
            variant: {
                outline: "top-3 left-2 leading-[1]",
                filled: "top-3 left-2 leading-[1]",
                standard: "top-3 left-2 leading-[1]",
                disable: "top-3 left-2 leading-[1]",
            },
        },
        defaultVariants: {
            variant: "outline",
        },
    }
);
//adorment icon style 
const adormentIcon = cva(
    ["p-0.5", "absolute", "top-1/2", "-translate-y-1/2", "right-1.5", " text-slate-900"],

)
type InputProps = ComponentProps<"input"> &
    VariantProps<typeof inputStyles> & {
        label?: string;
        InputOuterClass?: string;
        labelStyleClass?: string;
        adormentIconStyleProps?: string;
        isPassword?: boolean;
        iconPosition?: "start" | "end";
        showPasswordIcon?: React.ReactNode;
        hidePasswordIcon?: React.ReactNode;
    };

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, InputOuterClass, adormentIconStyleProps, isPassword = false, showPasswordIcon, labelStyleClass, hidePasswordIcon, iconPosition, variant, ...props }, ref) => {
        const [activeinput, SetActiveInput] = useState(false);
        const inputRef = useRef<HTMLInputElement | null>(null);
        const [showPassword, setShowPassword] = useState(false);
        const iconRef = useRef<HTMLButtonElement>(null);
        const [iconWidth, SetIconWidth] = useState(0);




        //for handeling onchange input value
        const handleinput = (event: React.ChangeEvent<HTMLInputElement>) => {
            SetActiveInput(true);
            const value = event.target.value;
            if (value.trim() !== "") {
                SetActiveInput(true);
            }
        }

        const handleInputFocus = () => {
            SetActiveInput(true);
        };
        // Detect clicks outside the input
        useEffect(() => {

            const handleClickOutside = (event: MouseEvent) => {
                if (inputRef.current && !inputRef.current.contains(event.target as Node) && inputRef.current.value.trim() === "") {
                    SetActiveInput(false);
                }
            };

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, []);

        // for password Show hide

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (
            event: React.MouseEvent<HTMLButtonElement>
        ) => {
            event.preventDefault();
        };
        // to mesure icon width
        useEffect(() => {
            if (iconRef.current) {
                const iconWidthVaue = iconRef.current.clientWidth;
                SetIconWidth(iconWidthVaue + 10);
                console.log(iconWidthVaue, "iconWidth");
            }
        }, [iconRef]);
        return (
            <div className={cn(containerStyles({ variant }), InputOuterClass)} ref={inputRef}>
                {label && (
                    <label className={activeinput ? cn(labelStyle({ variant }), labelStyleClass) : cn(activelabelStyle({ variant }), labelStyleClass)}>
                        {label}
                    </label>
                )}
                <input
                    {...props}
                    type={isPassword ? (showPassword ? "text" : "password") : props?.type}
                    autoComplete="off"
                    className={cn(inputStyles({ variant }), className,props.type==="number"?"numberinput":"")}
                    onChange={handleinput}
                    onFocus={handleInputFocus}
                    placeholder={label && activeinput === true ? props.placeholder : undefined}
                    style={{ paddingRight: `${iconWidth}px` }}
                    ref={(node) => {
                        inputRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref) {
                            (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
                        }
                    }}
                />
                {isPassword ? (
                    <button className={cn(adormentIcon({}), adormentIconStyleProps)} onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword} ref={iconRef}>
                        {

                            showPassword ? showPasswordIcon || <Icon name="eye" size={20} key="icon" /> : hidePasswordIcon || <Icon name="eyeSlash" size={20} key="icon" />

                        }
                    </button>) : null
                }
            </div>
        );
    }
);

Input.displayName = "Input";

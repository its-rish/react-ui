import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useState } from "react";
import { Icon } from "../Icons";

const inputStyles = cva([
    "w-full",
    "transition-all",
    "duration-100",
    "outline-none",
    "placeholder:text-gray-400",
    "placeholder:text-sm",
    "p-1.5",
    "leading-[0]"
]);

type InputProps = ComponentProps<"input"> & VariantProps<typeof inputStyles> & {
    label?: string | number;
    containerClassName?: string;
    labelClass?: string;
    labelPosition?: "end" | "start";
    checkedIcon?: React.ReactNode | React.ReactElement<typeof Icon>;
    unCheckedIcon?: React.ReactNode | React.ReactElement<typeof Icon>;
    iconStyleClass?: string;
};;

export const Radio = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, containerClassName, labelPosition, labelClass, checkedIcon, unCheckedIcon, iconStyleClass, onClick, ...props }, ref) => {
        const [active, setActive] = useState(false);

        const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
            setActive((prev) => !prev);
            if (onClick) {
                onClick(event);
            }
        };

        return (

            label ? (
                <label className={cn("w-full flex items-center -m-1.5 group  cursor-pointer", labelClass)}>
                    {
                        (checkedIcon && unCheckedIcon) ? (
                            <div className={cn("w-auto outline-none relative transition-all duration-200 ease-in-out", iconStyleClass, labelPosition === "start" ? " order-[0]" : labelPosition === "end" ? "order-1" : "order-1")}>
                                <input
                                    type="radio"
                                    {...props}
                                    ref={ref}
                                    className=" opacity-0 absolute top-0 left-0 w-full h-full"
                                    onClick={handleClick}
                                    checked={active}
                                />
                                {active ? (
                                    <i className=" inline-block leading-[0]">{checkedIcon}</i>
                                ) : (
                                    <i className=" inline-block leading-[0]">{unCheckedIcon}</i>
                                )}
                            </div>


                        ) : (
                            <input
                                type="radio"
                                {...props}
                                ref={ref}
                                className={cn(`${labelPosition === "start" ? " order-1" : labelPosition === "end" ? "order-[0]" : "order-[0]"}`,
                                    inputStyles({ className })
                                )}
                                onClick={handleClick}
                                checked={active}

                            />
                        )
                    }
                    {label && (
                        <span className={cn(`text-black , text-base , font-normal , leading-[1] , p-1.5 ${labelPosition === "start" ? "order-[0] " : labelPosition === "end" ? "order-1" : "order-1"}`, containerClassName)}>{label}</span>
                    )}
                </label>
            ) : (
                checkedIcon && unCheckedIcon ? (

                    <div className={cn("w-auto outline-none relative transition-all duration-200 ease-in-out", iconStyleClass, labelPosition === "start" ? " order-[0]" : labelPosition === "end" ? "order-1" : "order-1")}>

                        <input
                            type="radio"
                            {...props}
                            ref={ref}
                            className=" opacity-0 absolute top-0 left-0 w-full h-full"
                            onClick={handleClick}
                            checked={active}
                        />
                        {active ? (
                            <i className=" inline-block leading-[0]">{checkedIcon}</i>
                        ) : (
                            <i className=" inline-block leading-[0]">{unCheckedIcon}</i>
                        )}
                    </div>
                ) : (
                    <input
                        type="radio"
                        {...props}
                        ref={ref}
                        className={cn(
                            inputStyles({ className })
                        )}
                        onClick={handleClick}
                        checked={active}
                    />
                )
            )
        );
    }
);
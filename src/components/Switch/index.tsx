import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useState } from "react";

const switchStyle = cva([
    "w-[300%]",
    "-left-[100%]",
    "cursor-[inherit]",
    " absolute",
    "h-full",
    "top-0",
    "m-0",
    "p-0",
    "z-[1]",
    "opacity-0",
], {
    variants: {
        variant: {
            default: "",
            secondary: "",
        },

        colorscheme: {
            primary: "",
            secondary: ""
        },
    },
    compoundVariants: [
        {
            variant: "default",
            colorscheme: "primary",
            className: "bg-blue-500 hover:bg-blue-600",
        },
        {
            variant: "secondary",
            colorscheme: "secondary",
            className:
                "text-blue-600 border-blue-500 bg-transparent hover:bg-blue-100",
        },

    ],
    defaultVariants: {
        variant: "default",
        colorscheme: "primary",
    },
});

const activelabelStyle = cva(
    ["w-full", "inline-flex", "h-full", "p-2"," transition-all","duration-300","ease-in-out", " top-0", "left-0", " right-0", "absolute", "  justify-between", " items-center", " leading-5"],

);

type SwitchProps = ComponentProps<"div"> &
    VariantProps<typeof switchStyle> & {
        label?: string | number;
        labelTextClass?: string;
        switchWithLabelClass?: string;
        labelPosition?: "end" | "start";
        activelabel?: string | undefined;
        inactivelable?: string | undefined;
        innerlabelStyle?: string | undefined;

    };

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            className,
            label,
            labelTextClass,
            labelPosition,
            switchWithLabelClass,
            onClick,
            variant,
            inactivelable,
            activelabel,
            innerlabelStyle,
            ...props
        },
        ref
    ) => {
        const [active, setActive] = useState(false);

        const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
            setActive((prev) => !prev);
            if (onClick) {
                onClick(event);
            }
        };

        return label ?
            <label
                className={cn(
                    "w-full flex  items-center -m-3 group  cursor-pointer",
                    switchWithLabelClass
                )}
            >
                <span ref={ref} className={`${labelPosition === "start" ? " order-1" : labelPosition === "end" ? "order-[0]" : "order-[0]"} inline-flex w-[58px] h-[38px] overflow-hidden p-3 box-border relative flex-shrink-0 z-0 align-middle`}>
                    <span className={`${active ? "transform translate-x-[20px] bg-blue-500" : "bg-transparent"} inline-flex items-center justify-center box-border select-none align-middle appearance-none absolute top-0 left-0 z-10 text-gray-300 outline-none border-none m-0 no-underline p-[9px] rounded-full cursor-pointer transition-all duration-150 ease-in-out transform bg-transparent`}>
                        <input
                            type="checkbox"
                            {...props}
                            aria-label={props["aria-label"]}
                            className={cn(
                                `${labelPosition === "start"
                                    ? " order-1"
                                    : labelPosition === "end"
                                        ? "order-[0]"
                                        : "order-[0]"
                                }`,
                                switchStyle({ className })
                            )}
                            onClick={handleClick}
                            checked={active}
                        />
                        <span className={`${active === true ? "bg-blue-500" : "bg-current"} shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]  w-5 h-5 rounded-full`}></span>
                    </span>
                    <span className="h-full w-full z-[-1] opacity-30 rounded-[7px] transition-colors duration-150 ease-in-out bg-blue-300"></span>
                </span>
                {label && (
                    <span
                        className={cn(
                            `text-black , text-base , font-normal , leading-[1] , p-3, ${labelPosition === "start"
                                ? "order-[0] "
                                : labelPosition === "end"
                                    ? "order-1"
                                    : "order-1"
                            }`,
                            labelTextClass
                        )}
                    >
                        {label}
                    </span>
                )}
            </label>
            :
            (
                <>
                    {(variant === "default" || !variant) &&
                        <span ref={ref} className={`${labelPosition === "start" ? " order-1" : labelPosition === "end" ? "order-[0]" : "order-[0]"} inline-flex w-[58px] h-[38px] overflow-hidden p-3 box-border relative flex-shrink-0 z-0 align-middle`}>
                            <span className={`${active ? "transform translate-x-[20px] bg-blue-500" : "bg-transparent"} inline-flex items-center justify-center box-border select-none align-middle appearance-none absolute top-0 left-0 z-10 text-gray-300 outline-none border-none m-0 no-underline p-[9px] rounded-full cursor-pointer transition-all duration-150 ease-in-out transform bg-transparent`}>
                                <input
                                    type="checkbox"
                                    {...props}
                                    aria-label={props["aria-label"]}
                                    className={cn(
                                        `${labelPosition === "start"
                                            ? " order-1"
                                            : labelPosition === "end"
                                                ? "order-[0]"
                                                : "order-[0]"
                                        }`,
                                        switchStyle({ className })
                                    )}
                                    onClick={handleClick}
                                    checked={active}
                                />
                                <span className={`${active === true ? "bg-blue-500" : "bg-current"} shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]  w-5 h-5 rounded-full`}></span>
                            </span>
                            <span className="h-full w-full z-[-1] opacity-30 rounded-[7px] transition-colors duration-150 ease-in-out bg-blue-300"></span>
                        </span>
                    }
                    {variant === "secondary" &&
                        <span ref={ref} className={`${labelPosition === "start" ? " order-1" : labelPosition === "end" ? "order-[0]" : "order-[0]"} inline-flex w-[80px] h-[40px] overflow-hidden p-0 box-border relative flex-shrink-0 z-0 align-middle`}>
                            <span className={`${active ? "transform translate-x-[40px] bg-blue-500" : "bg-transparent"} inline-flex items-center justify-center box-border select-none align-middle appearance-none absolute top-0 left-0 z-10 text-gray-300 outline-none border-none m-0 no-underline p-[6px] rounded-lg cursor-pointer transition-all duration-150 ease-in-out transform bg-transparent`}>
                                <input
                                    type="checkbox"
                                    {...props}
                                    aria-label={props["aria-label"]}
                                    className={cn(
                                        `${labelPosition === "start"
                                            ? " order-1"
                                            : labelPosition === "end"
                                                ? "order-[0]"
                                                : "order-[0]"
                                        }`,
                                        switchStyle({ className })
                                    )}
                                    onClick={handleClick}
                                    checked={active}
                                />
                                <span className={`${active === true ? "bg-blue-500" : "bg-current"} shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]  w-7 h-7 rounded-lg`}></span>
                            </span>
                            {(activelabel && inactivelable) &&
                                <span className={cn(activelabelStyle({}), innerlabelStyle)}>
                                    {activelabel && (
                                        <span className={` inline-block text-base  ${active === true ? 'opacity-[1]' : 'opacity-0'}`}>{activelabel}</span>)}
                                    {inactivelable && (
                                        <span className={` inline-block text-inherit font-[inherit] leading-[inherit] ${active === true ? 'opacity-0' : 'opacity-[1]'}`}>{inactivelable}</span>)}
                                </span>
                            }
                            <span className="h-full w-full z-[-1] opacity-30 rounded-[7px] transition-colors duration-150 ease-in-out bg-blue-300"></span>
                        </span >
                    }
                </>
            )
    }
);

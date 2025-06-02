import { cn } from "@/utils";
import { createPopper } from "@popperjs/core";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../Button";

const menuContainerStyles = cva(
    ["relative inline-block text-left"],
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
);
// @ts-ignore
const menuButtonStyles = cva(
    ["inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"],
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
);

const itemContainerStyles = cva(
    ["origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"],
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
);

const itemStyles = cva(
    ["block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"],
    {
        variants: {
            variant: {},
        },
        defaultVariants: {},
    }
);

type MenuItem = {
    label: string;
    onClick: () => void;
};

type MenuProps = VariantProps<typeof menuContainerStyles> & {
    buttonLabel: string;
    items: MenuItem[];
};

export const Menu: React.FC<MenuProps> = ({
    buttonLabel,
    items,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popperInstance = useRef<any>(null);

    useEffect(() => {
        if (buttonRef.current && menuRef.current) {
            popperInstance.current = createPopper(buttonRef.current, menuRef.current, {
                placement: "bottom-end",
                modifiers: [
                    { name: "offset", options: { offset: [0, 4] } },
                    { name: "preventOverflow", options: { boundary: "viewport" } },
                ],
            });

            return () => {
                if (popperInstance.current) {
                    popperInstance.current.destroy();
                }
            };
        }
    }, [isOpen]);

    return (
        <div className={cn(menuContainerStyles({}))}>
            {/* <button
                ref={buttonRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(menuButtonStyles({}))}
            >
                {buttonLabel}
            </button> */}
            <Button variant='ghost' size='sm' onClick={() => setIsOpen((prev) => !prev)} >{buttonLabel}</Button>
            {isOpen && (
                <div
                    ref={menuRef}
                    className={cn(itemContainerStyles({}))}
                    role="menu"
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            className={cn(itemStyles({}))}
                            role="menuitem"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

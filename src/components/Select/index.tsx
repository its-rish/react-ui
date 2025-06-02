import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";

const selectStyle = cva([
    "w-full",
    "transition-all",
    "duration-100",
    "outline-none",
    "placeholder:text-gray-400",
    "placeholder:text-sm",
    "p-1.5",
    "leading-[0]",
]);

export interface SelectOption {
    label: string;
    value: string;
}

type CustomSelectProps = ComponentProps<"div"> &
    VariantProps<typeof selectStyle> & {
        options: SelectOption[];
        value?: string;
        defaultValue?: string;
        onChange?: (value: string) => void;
    };

export const Select = forwardRef<HTMLDivElement, CustomSelectProps>(
    ({ options, value, defaultValue, onChange, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState<string | undefined>(
            value || defaultValue
        );
        const buttonRef = useRef<HTMLButtonElement>(null);
        const dropdownRef = useRef<HTMLUListElement>(null);

        useEffect(() => {
            if (value !== undefined) {
                setSelectedValue(value);
            }
        }, [value]);

        const handleToggle = () => {
            if (!isOpen) {
                calculateDropdownPosition();
            }
            setIsOpen(!isOpen);
        };

        const handleOptionClick = (newValue: string) => {
            if (value === undefined) {
                setSelectedValue(newValue);
            }
            setIsOpen(false);
            if (onChange) onChange(newValue);
        };

        const calculateDropdownPosition = () => {
            if (buttonRef.current && dropdownRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();

                const top = buttonRect.bottom + window.scrollY;
                const left = buttonRect.left + window.scrollX;

                // Match dropdown width to button width
                const width = buttonRect.width;

                dropdownRef.current.style.position = "absolute";
                dropdownRef.current.style.top = `${top}px`;
                dropdownRef.current.style.left = `${left}px`;
                dropdownRef.current.style.width = `${width}px`;
                dropdownRef.current.style.zIndex = "10";
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div ref={ref} {...props} className="relative min-w-44">
                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className="p-2 bg-white border border-gray-300 rounded-md text-left w-full"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    {options.find((opt) => opt.value === (value || selectedValue))?.label ||
                        "Select an option"}
                </button>
                {isOpen && (
                    <ul
                        ref={dropdownRef}
                        className="bg-white border rounded shadow-lg"
                        role="listbox"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                role="option"
                                aria-selected={option.value === selectedValue}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
);


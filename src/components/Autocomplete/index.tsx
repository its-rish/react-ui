import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";

const containerStyles = cva(
    ["bg-white border-gray-100 border border-solid shadow-xl shadow-gray-200 relative w-full  rounded-2xl"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const inputStyles = cva(
    ["w-full px-3 py-2 rounded-[inherit] h-11 focus:outline-none focus:ring-2 focus:ring-transparent shadow-none border-none"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const labelStyle = cva(
    ["inline-block", "text-sm", "pointer-events-none", "font-medium", "text-gray-700", "absolute", "z-10", "transition-transform", "transition-all", "duration-75", "-top-2", "left-0.5", "leading-[1]", "scale-90", "px-1", "bg-white"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const activelabelStyle = cva(
    ["inline-block", "text-sm", "pointer-events-none", "font-medium", "text-gray-700", "absolute", "z-10", "transition-all", "duration-75", "top-3.5", "left-2", "leading-[1]"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const iconContainerStyles = cva(
    ["cursor-pointer absolute right-2 w-auto h-auto top-1/2 -translate-y-1/2 leading-[0]"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const optionsContainerStyles = cva(
    ["py-3 w-full max-h-48 overflow-auto border-none absolute z-50 "],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);
const optionsStyles = cva(
    ["text-black hover:bg-blue-100 px-3 py-2 cursor-pointer"],
    {
        variants: {
            variant: {
            },
        },
        defaultVariants: {
        },
    }
);

type Option = {
    label: string; // Display value for the option
    value: string; // Unique identifier for the option
};


type AutocompleteProps = VariantProps<typeof containerStyles> & VariantProps<typeof inputStyles> & VariantProps<typeof optionsStyles> & {
    label?: string;
    options: Array<Option>; // List of all available options
    placeholder?: string; // Placeholder text for the input
    valueChange?: (value: Option | Array<Option> | null) => void; // Callback when valueChange changes
    dropdownState: (value: 'opened' | 'closed') => void;
    containerClassName?: string; // Custom class for the autocomplete container
    inputClassName?: string; // Custom class for the input field
    labelStyleClass?: string; // Custom class for the label
    optionsClassName?: string; // Custom class for the autocomplete container
    dropDownIcon?: React.ReactElement<typeof Icon>;
    multiple?: boolean;
};
export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
    (
        {
            label,
            options,
            placeholder = "Search...",
            valueChange,
            dropdownState,
            containerClassName,
            inputClassName,
            labelStyleClass,
            optionsClassName,
            dropDownIcon = <Icon name="upArrow" size={20} color="blue" key="icon" />,
            multiple = false
        }, ref) => {

        const [inputValue, setInputValue] = useState("");
        const [value, setValue] = useState<Array<Option> | Option | null>(null);
        const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const iconRef = useRef<HTMLDivElement>(null);
        const [iconWidth, SetIconWidth] = useState(0);

        const inputRef = useRef<HTMLInputElement>(null);
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const dropdownRef = useRef<HTMLUListElement>(null);
        // const [popperInstance, setPopperInstance] = useState<any>(null);


        // useEffect(() => {
        //     const _inputRef = inputRef || textareaRef;
        //     if (_inputRef.current && dropdownRef.current) {
        //         const popper = createPopper(_inputRef.current, dropdownRef.current, {
        //             placement: "auto",
        //             modifiers: [
        //                 {
        //                     name: "offset",
        //                     options: {
        //                         offset: [0, 4],
        //                     },
        //                 },
        //                 {
        //                     name: "preventOverflow",
        //                     options: {
        //                         boundary: "viewport",
        //                     },
        //                 },
        //                 {
        //                     name: "flip",
        //                     options: {
        //                         fallbackPlacements: ["top", "bottom"],
        //                     },
        //                 },
        //             ],
        //         });

        //         setPopperInstance(popper);

        //         return () => {
        //             popper.destroy(); // Clean up Popper instance
        //         };
        //     }
        // }, [isDropdownOpen]);



        // Filter options based on input
        useEffect(() => {
            let filtered = [...options];
            if (multiple) {
                let _options: Array<Option> = [...options];
                if (value && Array.isArray(value)) {
                    _options = _options.filter((option) => !value.includes(option));
                }
                const currentOption = inputValue.split(',')[inputValue.split(',').length - 1];
                filtered = _options.filter((option) =>
                    option.label.toLowerCase().includes(currentOption.toLowerCase())
                );
            } else {
                filtered = options.filter((option) =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                );
            }

            setFilteredOptions(filtered);
        }, [inputValue, options]);

        // to mesure icon width
        useEffect(() => {
            if (iconRef.current) {
                const iconWidthVaue = iconRef.current.clientWidth;
                SetIconWidth(iconWidthVaue + 10);
            }
        }, [iconRef]);

        // to emit value changes
        useEffect(() => {
            if (valueChange && value) {
                valueChange(value);
            }
        }, [value]);

        // to emit dropdown state
        useEffect(() => {
            dropdownState(isDropdownOpen ? 'opened' : 'closed');
        }, [isDropdownOpen]);

        // To handle input value change
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            // To open the dropdown when user starts typing
            setIsDropdownOpen(true);
        };

        const handleOptionClick = (selectedOption: Option) => {
            let _value;
            let _inputValue;
            if (multiple) {
                if (value && Array.isArray(value)) {
                    _value = [...value, selectedOption];
                    _inputValue = [...value, selectedOption].map((items: Option) => items.label).join(',') + ',';
                } else {
                    _value = [selectedOption];
                    _inputValue = selectedOption.label + ',';
                }
            } else {
                _value = selectedOption;
                _inputValue = selectedOption.label;
            }
            setValue(_value);
            setInputValue(_inputValue);
            setIsDropdownOpen(false);
            autoGrowTextZone();

        };

        // to handle delete or backspace key press
        const handleDeleteOrBackspace = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (multiple) {
                const cursorPosition = e.currentTarget.selectionStart; // Get cursor position
                if (cursorPosition !== null) {
                    const elements = inputValue.split(","); // Split the string by commas
                    let currentIndex = 0; // Track the starting index of each element
                    let _valueItem = null;
                    for (const element of elements) {
                        const start = currentIndex;
                        const end = currentIndex + element.length;
                        if (cursorPosition >= start && cursorPosition <= end) {
                            _valueItem = element;
                            break;
                        }
                        currentIndex = end + 1; // Move to the next element (+1 for the comma)
                    }
                    if (_valueItem && value && Array.isArray(value)) {
                        e.preventDefault()
                        let _value = value.filter((item: Option) => item.label !== _valueItem);
                        if (_value.length === 0) {
                            setValue(null);
                            setInputValue('');
                        } {
                            setValue(_value);
                            setInputValue(_value.map((item: Option) => item.label).join(',') + (_value.length > 0 ? ',' : ''));
                        }
                        autoGrowTextZone();
                    }
                }
            }
        };

        // Close dropdown on blur
        const handleBlur = () => {
            setTimeout(() => setIsDropdownOpen(false), 200);
        };

        // To auto grow text area when multiple is set to true
        const autoGrowTextZone = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = "0px"; // Reset the height to 0
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to the scrollHeight
            }
        }
        return (
            <div ref={ref} className={cn(containerStyles({}), containerClassName)}>
                {/* Input Field */}
                <div className="relative rounded-[inherit]">
                    {label && (
                        <label className={inputValue ? cn(labelStyle({}), labelStyleClass) : (isDropdownOpen ? cn(labelStyle({}), labelStyleClass) : cn(activelabelStyle({}), labelStyleClass))}>
                            {label}
                        </label>
                    )}
                    {multiple ?
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setIsDropdownOpen(true)}
                            onBlur={handleBlur}
                            onKeyUp={() => autoGrowTextZone()}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" || e.key === "Delete") {
                                    handleDeleteOrBackspace(e); // Call your custom handler
                                }
                            }}
                            placeholder={isDropdownOpen ? placeholder : undefined}
                            className={cn(inputStyles({}), inputClassName)}
                            style={{ paddingRight: `${iconWidth}px`, resize: "none" }}
                        />
                        :
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setIsDropdownOpen(true)}
                            onBlur={handleBlur}
                            placeholder={isDropdownOpen ? placeholder : undefined}
                            className={cn(inputStyles({}), inputClassName)}
                            style={{ paddingRight: `${iconWidth}px` }}

                        />}
                    <div className={cn(iconContainerStyles({}), `${isDropdownOpen ? 'rotate-0 transition-transform ease-linear duration-75' : 'rotate-180 transition-transform ease-linear duration-75'}`)}
                        onClick={() => { isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true) }} ref={iconRef}>
                        {dropDownIcon}
                    </div>
                </div>

                {/* Dropdown List */}
                {isDropdownOpen && filteredOptions.length > 0 && (
                    <ul className={cn(optionsContainerStyles({}))} ref={dropdownRef}>
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className={cn(optionsStyles({}), optionsClassName)}
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
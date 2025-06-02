import { cn } from "@/utils";
import React, { useState } from "react";
import { Chip } from "./Chip"; // Reuse the Chip component we created earlier

type Option = {
    label: string;
    value: string;
};

interface ChipAutocompleteProps {
    options: Option[]; // Options for the autocomplete dropdown
    selectedOptions?: Option[]; // Initial selected chips
    placeholder?: string; // Placeholder text for the input field
    onChange?: (selected: Option[]) => void; // Callback when chips change
    className?: string; // Custom class for the autocomplete container
}

export const ChipAutocomplete: React.FC<ChipAutocompleteProps> = ({
    options,
    selectedOptions = [],
    placeholder = "Add...",
    onChange,
    className,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedChips, setSelectedChips] = useState<Option[]>(selectedOptions);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        // Filter options based on input
        setFilteredOptions(
            options.filter(
                (option) =>
                    option.label.toLowerCase().includes(e.target.value.toLowerCase()) &&
                    !selectedChips.some((chip) => chip.value === option.value)
            )
        );
    };

    const handleAddChip = (option: Option) => {
        const updatedChips = [...selectedChips, option];
        setSelectedChips(updatedChips);
        setInputValue("");
        setFilteredOptions(options.filter((opt) => !updatedChips.some((chip) => chip.value === opt.value)));
        if (onChange) onChange(updatedChips);
    };

    const handleRemoveChip = (value: string) => {
        const updatedChips = selectedChips.filter((chip) => chip.value !== value);
        setSelectedChips(updatedChips);
        setFilteredOptions(options.filter((opt) => !updatedChips.some((chip) => chip.value === opt.value)));
        if (onChange) onChange(updatedChips);
    };

    return (
        <div className={cn("relative w-full", className)}>
            {/* Chips Display */}
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedChips.map((chip) => (
                    <Chip
                        key={chip.value}
                       colorscheme="gray"
                        variant="solid"
                        size="sm"
                        className="py-2"
                        onDelete={() => handleRemoveChip(chip.value)}
                    >
                        {chip.label}
                    </Chip>
                ))}
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Autocomplete Dropdown */}
            {inputValue && filteredOptions.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-48 overflow-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleAddChip(option)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

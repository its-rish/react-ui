import { cn } from "@/utils";
import React, { useState } from "react";
import { Chip } from "./Chip"; // Reuse the Chip component we created earlier

interface ChipInputProps {
    placeholder?: string; // Placeholder text for the input field
    initialChips?: string[]; // Initial chips to render
    onChange?: (chips: string[]) => void; // Callback for chips updates
    delimiter?: string; // Custom delimiter for adding chips (default is Enter)
    className?: string; // Custom class for the component container
}

export const ChipInput: React.FC<ChipInputProps> = ({
    placeholder = "Add a chip...",
    initialChips = [],
    onChange,
    delimiter = "Enter",
    className,
}) => {
    const [chips, setChips] = useState<string[]>(initialChips);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === delimiter || e.key === "Enter") && inputValue.trim() !== "") {
            e.preventDefault();
            const newChip = inputValue.trim();

            if (!chips.includes(newChip)) {
                const updatedChips = [...chips, newChip];
                setChips(updatedChips);
                if (onChange) onChange(updatedChips);
            }
            setInputValue("");
        }

        // Remove the last chip if Backspace is pressed and input is empty
        if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
            const updatedChips = chips.slice(0, -1);
            setChips(updatedChips);
            if (onChange) onChange(updatedChips);
        }
    };

    const handleRemoveChip = (chipToRemove: string) => {
        const updatedChips = chips.filter((chip) => chip !== chipToRemove);
        setChips(updatedChips);
        if (onChange) onChange(updatedChips);
    };

    return (
        <div className={cn("flex flex-wrap items-center gap-2 border rounded px-2 py-1", className)}>
            {/* Render Chips */}
            {chips.map((chip) => (
                <Chip
                    key={chip}
                    colorscheme="gray"
                    variant="solid"
                    size="sm"
                    className="py-2"
                    onDelete={() => handleRemoveChip(chip)}
                >
                    {chip}
                </Chip>
            ))}

            {/* Input Field */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className="flex-grow outline-none py-1 text-sm"
            />
        </div>
    );
};

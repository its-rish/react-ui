import type { Meta, StoryObj } from "@storybook/react";
import { ChipInput } from "./ChipInput";

const meta: Meta<typeof ChipInput> = {
    title: "Components/ChipInput",
    component: ChipInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof ChipInput>;

export const Default: Story = {
    args: {
        placeholder: "Add a tag...",
        initialChips: ["JavaScript", "TypeScript"],
        onChange: (chips) => console.log("Chips updated:", chips),
    },
};

export const CustomDelimiter: Story = {
    args: {
        placeholder: "Add an item...",
        delimiter: ",", // Add chips by typing a comma
        initialChips: ["React", "Angular"],
        onChange: (chips) => console.log("Chips updated:", chips),
    },
};

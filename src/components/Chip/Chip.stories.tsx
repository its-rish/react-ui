import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
    title: "Components/Chip",
    component: Chip,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const SolidGray: Story = {
    args: {
        children: "Solid Gray Chip",
        variant: "solid",
        colorscheme: "gray",
    },
};

export const OutlineBlue: Story = {
    args: {
        children: "Outline Blue Chip",
        variant: "outline",
        colorscheme: "blue",
        icon: <span>🌟</span>,
        iconPosition: "start",
    },
};

export const GhostWithDelete: Story = {
    args: {
        children: "Ghost Red Chip",
        variant: "ghost",
        colorscheme: "red",
        onDelete: () => alert("Chip deleted!"),
    },
};

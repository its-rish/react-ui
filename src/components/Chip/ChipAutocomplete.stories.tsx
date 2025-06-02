import type { Meta, StoryObj } from "@storybook/react";
import { ChipAutocomplete } from "./ChipAutocomplete";

const meta: Meta<typeof ChipAutocomplete> = {
    title: "Components/ChipAutocomplete",
    component: ChipAutocomplete,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof ChipAutocomplete>;

export const Default: Story = {
    args: {
        options: [
            { label: "JavaScript", value: "javascript" },
            { label: "TypeScript", value: "typescript" },
            { label: "React", value: "react" },
            { label: "Angular", value: "angular" },
            { label: "Vue", value: "vue" },
        ],
        placeholder: "Start typing...",
    },
};

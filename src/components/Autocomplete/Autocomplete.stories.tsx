import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from ".";
import { Icon } from "../Icons";
const meta: Meta<typeof Autocomplete> = {
    title: "Components/Autocomplete",
    component: Autocomplete,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;


export const Default: Story = {
    args: {
        options: [
            { label: "JavaScript", value: "1" },
            { label: "TypeScript", value: "2" },
            { label: "React", value: "3" },
            { label: "Angular", value: "4" },
            { label: "Vue", value: "5" },
        ],
        label: "Framework",
        placeholder: "Search framework...",
        valueChange: (value) => console.log("value change:", value),
        dropdownState: (state) => console.log("value change:", state),
        // bgListClassName: "bg-red-500",
        // optionsClassName: "text-blue-500",
        dropDownIcon: <Icon name="upArrow" size={20} color="blue" key="icon" />,
        multiple: true
    },
};

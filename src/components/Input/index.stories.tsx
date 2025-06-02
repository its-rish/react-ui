import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
    args: {
    },
};
export const inputWithSolid: Story = {
    args: {
        variant: "filled",
    },
};
export const inputWithStandard: Story = {
    args: {
        variant: "standard"
    },
};
export const OutlineInputWithLabel: Story = {
    args: {
        variant: "outline",
        label: "Label Text",
        placeholder: "Enter You Password",

    },
};
export const passwordType: Story = {
    args: {
        variant: "filled",
        placeholder: "Enter You Password",
        isPassword: true,
        label: "Label Text"
    },
};
export const NumberType: Story = {
    args: {
        variant: "filled",
        placeholder: "999999999",
        isPassword: false,
        label: "Enter You PhoneNumber",
        type: "number"
    },
};



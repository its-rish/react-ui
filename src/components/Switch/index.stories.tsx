import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const meta: Meta<typeof Switch> = {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultSwitch: Story = {
    args: {
    },
};


export const SwitchWithLable: Story = {
    args: {
        label: "lableText",
    },
};

export const SwitchWithEndLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "end"
    },
};


export const SwitchWithStartLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "start"
    },
};
export const switchWithInnerLabel: Story = {
    args: {
        variant: "secondary",
        activelabel: "on",
        inactivelable: "off"
    },
};

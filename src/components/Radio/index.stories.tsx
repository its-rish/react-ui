import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from ".";
import { Icon } from "../Icons";

const meta: Meta<typeof Radio> = {
    title: "Components/Radio",
    component: Radio,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const radio: Story = {
    args: {
    },
};

export const RadioWithLable: Story = {
    args: {
        label: "lableText",
    },
};

export const RadioWithEndLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "end"
    },
};


export const RadioWithStartLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "start"
    },
};
export const CustomRadioIcon: Story = {
    args: {
        label: "lableText",
        labelPosition: "start",
        checkedIcon: [
            <Icon name="home" size={25} color="blue-600" key="icon" />
        ],
        unCheckedIcon: [
            <Icon name="search" size={25} color="blue-600" key="icon" />
        ]
    },
};
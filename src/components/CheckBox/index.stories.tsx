import type { Meta, StoryObj } from "@storybook/react";
import { CheckBox } from ".";
import { Icon } from "../Icons";

const meta: Meta<typeof CheckBox> = {
    title: "Components/CheckBox",
    component: CheckBox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
    args: {
    },
};


export const CheckBoxWithLable: Story = {
    args: {
        label: "lableText",
    },
};

export const CheckBoxWithEndLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "end"
    },
};


export const CheckBoxWithStartLabel: Story = {
    args: {
        label: "lableText",
        labelPosition: "start"
    },
};

export const CheckBoxWithCustomIcon: Story = {
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

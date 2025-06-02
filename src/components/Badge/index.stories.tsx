import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";
import { Icon } from "../Icons";

const meta: Meta<typeof Badge> = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const basicBadge: Story = {
    args: {
        children: [
            <Icon name="search" size={30} color="blue-600" key="icon" />
        ]
    },
};
export const badgeWidthNumber: Story = {
    args: {
        children: [
            <Icon name="home" size={30} color="blue-600" key="icon" />
        ],
        badgeContent: 4,
        size:"sm",
        color:"secondary",
        position:"topRight"
    },
};



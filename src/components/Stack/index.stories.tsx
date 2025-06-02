import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from ".";

const meta: Meta<typeof Stack> = {
    title: "Components/Stack",
    component: Stack,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultStack: Story = {
    args: {
        className: 'gap-2',
        children: [<p>hii</p>, <p>John</p>, <p>Den</p>],
        justify: "end"
    },
};



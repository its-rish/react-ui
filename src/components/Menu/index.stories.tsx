import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./index";
const meta: Meta<typeof Menu> = {
    title: "Components/Menu",
    component: Menu,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Menu>;


export const Default: Story = {
    args: {
        buttonLabel: "Open Menu",
        items: [
            { label: "Profile", onClick: () => alert("Profile clicked") },
            { label: "Settings", onClick: () => alert("Settings clicked") },
            { label: "Logout", onClick: () => alert("Logout clicked") },
        ],
    },
};
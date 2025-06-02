import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { Icon } from "../Icons/index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: "solid",
    size: "md",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Button",
  },
};

export const icon: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: [
      "Search"
    ],

    icon: [
      <Icon name="search" size={20} color="blue-600" key="icon" />
    ],
  },
};

export const StartIcon: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: [
      "Search"
    ],
    iconPosition: "start",

    icon: [
      <Icon name="search" size={20} color="blue-600" key="icon" />
    ],
  },
};

export const EndIcon: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: [
      "Search"
    ],
    iconPosition: "end",
    icon: [
      <Icon name="search" size={20} color="blue-600" key="icon" />

    ],
  },
};
export const IconButton: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: [
      <Icon name="search" size={20} color="blue-600" key="icon" />
    ],

  },
};
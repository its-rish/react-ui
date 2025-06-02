import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const primarySmall: Story = {
  args: {
    variant: "primary",
    size: "sm",
  },
};
export const secondaryMediumWithTitle: Story = {
  args: {
    variant: "secondary",
    size: "md",
    title:"Andrew"
  },
};

export const disableLarge: Story = {
  args: {
    variant: "disable",
    size: "lg",
  },
};
export const avatarWithImage: Story = {
  args: {
    variant: "secondary",
    size: "md",
    imgProps: {
      src: "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png"
    }
  },
};



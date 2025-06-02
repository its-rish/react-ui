import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from ".";

const meta: Meta<typeof List> = {
    title: "Components/List",
    component: List,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Unordered: Story = {
    args: {

        variant: "unordered",
        size: "md",
        spacing: "normal",
        className: "",
        children: [
            <>
                <ListItem disabledPadding={true}  >done</ListItem>
                <ListItem disabledPadding={true}  >not Done</ListItem>
                <ListItem disabledPadding={true}  >Should be</ListItem>
            </>
        ]
    },
};

export const Ordered: Story = {
    args: {

        variant: "ordered",
        size: "lg",
        spacing: "noSpace",
        className: "",

        children: [
            <>
                <ListItem disabledPadding={true} className=" text-blue-700 font-bold" >Apple</ListItem>
                <ListItem disabledPadding={true} className=" text-blue-700 font-bold" >Oranges</ListItem>
                <ListItem disabledPadding={true} className=" text-blue-700 font-bold" >Guava</ListItem>
            </>
        ]
    },
};

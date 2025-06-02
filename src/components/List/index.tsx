import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";


const listStyles = cva(
    ["w-full", "list-none", "flex", "flex-col", "gap-2", "flex-wrap"],
    {
        variants: {
            variant: {
                unordered: "list-disc ",
                ordered: "list-decimal ",
            },
            size: {
                sm: "text-sm ",
                md: "text-base",
                lg: "text-lg",
            },
            spacing: {
                compact: "gap-1",
                normal: "gap-2",
                spacious: "gap-4",
                noSpace: "gap-0"
            },
        },
        defaultVariants: {
            variant: "unordered",
            size: "md",
            spacing: "normal",
        },
    }
);
const listItemStyle = cva(
    ["w-full"],
);

type ListProps = ComponentProps<"ul"> &
    VariantProps<typeof listStyles> & {


};
type ListItemProps = ComponentProps<"li"> &
    VariantProps<typeof listItemStyle> & {
        disabledPadding?: boolean;
    }


export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
    ({ variant, size, spacing, className, ...props }, ref) => {
        // Determine the tag based on the `variant` prop
        const ListTag = variant === "ordered" ? "ol" : "ul";

        return (
            <ListTag
                ref={ref as any} // Casting to satisfy ref type mismatch for ul/ol
                className={cn(listStyles({ variant, size, spacing, className }))}
                {...props}
            >
                {props.children}
            </ListTag>
        );
    }
);
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
    ({ className, disabledPadding, ...props }, ref) => {
        return (
            <li ref={ref as any} {...props} className={cn(listItemStyle({ className }), disabledPadding ? '!p-0 !px-0 !py-0' : 'px-2 py-1')}>
                {props.children}
            </li>
        )
    }
)

List.displayName = "List";
ListItem.displayName = "ListItem"
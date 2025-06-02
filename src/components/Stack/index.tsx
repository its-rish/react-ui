import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const StackStyle = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      "flex-start": "items-start",
      "flex-end": "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly",
    },
    wrap: {
      wrap: "wrap",
      noWrap: "noWrap"
    }
  },
  defaultVariants: {
    direction: "row",
    align: "start",
    justify: "start",
  },
});

type StackProps = ComponentProps<"div"> &
  VariantProps<typeof StackStyle> & {

}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      align,
      justify,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(StackStyle({ direction, align, justify }), className)}
        {...props}
      >
        <>
          {children}
        </>
      </div>
    );
  }
);

Stack.displayName = "Stack";

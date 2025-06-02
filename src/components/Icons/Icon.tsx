import { cn } from "@/utils";
import React from "react";
import { getDynamicIcon } from "./dynamicIcons";
import { preBuiltIcons } from "./iconList";

type PreBuiltIcons = keyof typeof preBuiltIcons;

type IconProps = {
    name?: PreBuiltIcons; // Name of pre-built icons
    svgPath?: string;     // Path to custom SVG file (e.g., `/icons/custom.svg`)
    size?: number | "sm" | "md" | "lg"; // Icon size
    color?: string;       // Stroke/fill color
    className?: string;   // Additional CSS classes
    title?: string;       // Accessibility title
};

// Map size prop to pixel values
const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
};

export const
    Icon: React.FC<IconProps> = ({
        name,
        svgPath,
        size = "md",
        color = "currentColor",
        className,
        title,
    }) => {
        const iconSize = typeof size === "string" ? sizes[size] : size;

        // Render pre-built icon if `name` is provided
        if (name && preBuiltIcons[name]) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={iconSize}
                    height={iconSize}
                    className={cn("inline-block", className)}
                    stroke={color}
                    style={{ color }}
                    aria-label={title}
                >
                    {preBuiltIcons[name]}
                </svg>
            );
        }

        // Render dynamic icon if registered
        if (name && getDynamicIcon(name)) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={iconSize}
                    height={iconSize}
                    className={cn("inline-block", className)}
                    stroke={color}
                    style={{ color }}
                    aria-label={title}
                >
                    {getDynamicIcon(name)}
                </svg>
            );
        }

        // Render custom SVG if `svgPath` is provided
        if (svgPath) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={iconSize}
                    height={iconSize}
                    className={cn("inline-block", className)}
                    stroke={color}
                    style={{ color }}
                    aria-label={title}
                >
                    <use href={svgPath} />
                </svg>
            );
        }

        // Fallback for missing `name` or `svgPath`
        console.warn("Icon component requires a valid `name` or `svgPath` prop.");
        return null;
    };

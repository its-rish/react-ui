import React from "react";

// Store dynamically registered icons
const dynamicIcons: Record<string, React.ReactNode> = {};

// Register a dynamic icon
export const registerIcon = (name: string, svgContent: React.ReactNode) => {
  dynamicIcons[name] = svgContent;
};

// Get a registered dynamic icon
export const getDynamicIcon = (name: string) => dynamicIcons[name];
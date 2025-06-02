// src/components/Alert.tsx
import { cva, VariantProps } from "class-variance-authority";
import { FC, ReactNode } from "react";

const alertContainerStyles = cva(
    [
        "fixed p-4 rounded shadow-lg", // Common styles
    ],
    {
        variants: {
            type: {
                success: "bg-green-100 text-green-800",
                error: "bg-red-100 text-red-800",
                warning: "bg-yellow-100 text-yellow-800",
                info: "bg-blue-100 text-blue-800",
            },
            position: {
                "top-left": "top-4 left-4",
                "top-right": "top-4 right-4",
                "bottom-left": "bottom-4 left-4",
                "bottom-right": "bottom-4 right-4",
            },
        },
        defaultVariants: {
            type: "info",
            position: "top-right",
        },
    }
);

type AlertProps = VariantProps<typeof alertContainerStyles> & {
    message: string;
    onClose?: () => void;
    children?: ReactNode;
}

const Alert: FC<AlertProps> = ({
    message,
    type,
    position,
    onClose,
    children,
}) => {
    return (
        <div className={alertContainerStyles({ type, position })} role="alert">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                {onClose && (
                    <button
                        className="ml-4 text-lg font-bold"
                        onClick={onClose}
                        aria-label="Close Alert"
                    >
                        &times;
                    </button>
                )}
            </div>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
};

export default Alert;
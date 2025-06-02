// src/components/Alert.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import Alert from "./index";
const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;


export const Default: Story = {
    args: {
        type: "success",
        position: "bottom-right",
        message: "This alert can be closed.",
    },
};



// import { Meta, StoryFn } from "@storybook/react";
// import { useState } from "react";
// import Alert from "./index";

// export default {
//     title: "Components/Alert",
//     component: Alert,
//     argTypes: {
//         type: {
//             control: {
//                 type: "select",
//                 options: ["success", "error", "warning", "info"],
//             },
//         },
//         position: {
//             control: {
//                 type: "select",
//                 options: ["top-left", "top-right", "bottom-left", "bottom-right"],
//             },
//         },
//     },
// } as Meta;

// const Template: StoryFn<any> = (args) => {
//     const [isVisible, setIsVisible] = useState(false);

//     return (
//         <div>
//             <button
//                 className="p-2 bg-blue-500 text-white rounded"
//                 onClick={() => setIsVisible(true)}
//             >
//                 Show Alert
//             </button>

//             {isVisible && (
//                 <Alert
//                     {...args}
//                     onClose={() => setIsVisible(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export const Default = Template.bind({});
// Default.args = {
//     message: "This is an alert!",
//     type: "info",
//     position: "top-right",
// };

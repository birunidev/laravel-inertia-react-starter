import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#2563eb",

                    "primary-content": "#f3f4f6",

                    secondary: "#f3f4f6",

                    "secondary-content": "#1f2937",

                    accent: "#c70000",

                    "accent-content": "#fbd5cf",

                    neutral: "#374151",

                    "neutral-content": "#d0cfc9",

                    "base-100": "#fff",

                    "base-200": "#f3f4f6",

                    "base-300": "#e5e7eb",

                    "base-content": "#1f2937",

                    info: "#0087eb",

                    "info-content": "#000613",

                    success: "#008400",

                    "success-content": "#f3f4f6",

                    warning: "#ffb100",

                    "warning-content": "#160c00",

                    error: "#cb003d",

                    "error-content": "#fcd5d6",
                },
            },
        ],
    },

    plugins: [forms, require("daisyui")],
};

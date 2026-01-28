/**
 * Configuration has been moved to src/index.css using Tailwind v4 @theme directive.
 * This file is kept as a placeholder to prevent build tools from complaining if they expect it,
 * but it exports an empty configuration.
 */
export default {
    // Empty config to defer to CSS configuration
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Keep content scanning explicit just in case
    theme: {
        extend: {},
    },
    plugins: [],
};

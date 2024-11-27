import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
    build: {
        outDir: "docs",
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
    ],
});

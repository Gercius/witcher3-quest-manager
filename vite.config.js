import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
    build: {
        outDir: "docs",
        target: "esnext",
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
    ],
});

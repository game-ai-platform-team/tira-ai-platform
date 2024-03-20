/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const mode = process.env.MODE;
const env = loadEnv(mode, process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
    mode,
    base: env.VITE_BASE_URL,
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        coverage: {
            provider: "v8",
            reporter: ["json", "html"],
            include: ["src"],
            exclude: [
                "src/tests/**",
                "src/interfaces/**",
                "**/*.d.ts",
                "src/main.tsx",
                "src/App.tsx",
            ],
        },
    },
    server: {
        proxy: {
            "/socket.io": {
                target: "http://127.0.0.1:5000",
                changeOrigin: true,
                ws: true,
            }, //similarly to app.py, we define a route for staging here
            "/ai-platform/socket.io": {
                target: "http://127.0.0.1:5000",
                changeOrigin: true,
                ws: true,
            },
            "/gameconnection": {
                target: "ws://127.0.0.1:5000",
                ws: true,
            },
        },
    },
});

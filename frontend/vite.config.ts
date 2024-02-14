/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        coverage: {
            provider: "v8",
            reporter: ["json", "html"],
            include: ["src"],
            exclude: ["src/tests/**", "src/interfaces/**", "**/*.d.ts", "src/main.tsx", "src/App.tsx"],
        },
    },
    server: {
        proxy: {
            "/socket.io": {
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

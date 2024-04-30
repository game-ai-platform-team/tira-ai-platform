import { defineConfig } from "cypress";

const PORT = process.env.UWSGI_HTTP || 5000;

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: `http://localhost:${PORT}`,
    },
    env: {
        BACKEND: `http://localhost:${PORT}`,
    },
    viewportHeight: 900,
    viewportWidth: 1600,
});

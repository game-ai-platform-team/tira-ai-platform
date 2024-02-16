module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "cypress.config.ts"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "react"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "import/no-named-as-default": ["off"],
        "prefer-const": ["error"],
        "object-shorthand": ["error"],
        "prefer-template": ["error"],
        complexity: ["error", { "max": 10 }],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};

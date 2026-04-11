import js from "@eslint/js"
import tseslint from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

export default tseslint.config(
  // Ignored paths
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "api/generated/**",
      "src/routeTree.gen.ts",
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React + hooks
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Not needed with React 19's JSX transform
      "react/react-in-jsx-scope": "off",
    },
  },

  // Project-wide rules
  {
    rules: {
      "quotes": ["error", "double", { avoidEscape: true }],

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],

      // General
      "eqeqeq": ["error", "always"],
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
    },
  },
)

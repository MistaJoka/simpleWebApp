// ESLint flat config: Next presets + TS + ignore build dirs
import { defineConfig, globalIgnores } from "eslint/config";
// core web vitals rules
import nextVitals from "eslint-config-next/core-web-vitals";
// typescript rules
import nextTs from "eslint-config-next/typescript";

// merge arrays into one flat config export
const eslintConfig = defineConfig([
  // spread vitals
  ...nextVitals,
  // spread ts
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

// export default for eslint CLI
export default eslintConfig;

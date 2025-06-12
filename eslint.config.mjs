import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Generated files
      "lib/generated/**/*",
      "prisma/generated/**/*",
      ".next/**/*",
      "out/**/*",
      "build/**/*",
      "dist/**/*",
      "node_modules/**/*",
      // Config files
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  {
    rules: {
      // Disable or downgrade overly strict rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-this-alias": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      
      // React rules
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      
      // Next.js rules
      "@next/next/no-img-element": "warn",
      
      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
    },
  },
];

export default eslintConfig;

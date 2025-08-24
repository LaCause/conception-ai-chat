import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      // ✅ Projet 1 : tests Storybook (ce que tu avais déjà)
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },

      // ✅ Projet 2 : tests unitaires du design system
      {
        extends: true,
        esbuild: {
          jsx: "automatic",
        },
        test: {
          name: "ds",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/design-system/**/*.test.{ts,tsx}"],
          css: true,
          alias: {
            "@": path.resolve(dirname, "src"),
          },
        },
      },
      // ✅ Projet 3 : tests unitaires du domain
      {
        extends: true,
        esbuild: {
          jsx: "automatic",
        },
        test: {
          name: "domain",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/app/**/*.test.{ts,tsx}"],
          alias: {
            "@": path.resolve(dirname, "src"),
          },
        },
      },
    ],
  },
});

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(ansi-regex|strip-ansi)/)",
  ],
};

// next/jest can override transformIgnorePatterns, so we use the async wrapper
// to ensure our config takes precedence
export default async () => {
  const jestConfig = await createJestConfig(config)();
  return {
    ...jestConfig,
    transformIgnorePatterns: config.transformIgnorePatterns,
  };
};

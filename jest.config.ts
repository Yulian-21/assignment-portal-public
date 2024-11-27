import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/index.tsx'],
  coveragePathIgnorePatterns: ['\\.stories\\.(tsx|mdx)$', '<rootDir>/src/components/index.tsx'],
  setupFilesAfterEnv: ['./jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  //{'^.+\\.(t|j)sx?$': '@swc/jest',},
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/tests/**/*.test.(js|jsx|ts|tsx)', '**/?(*.)+(spec|test).(js|jsx|ts|tsx)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: [
    'tsx',
    'ts',
    'js',
    'jsx',
  ],
};

export default config;

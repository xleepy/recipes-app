/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    // react-router-dom specifies "module" field in package.json for ESM entry
    // if it's not mapped, it uses the "main" field which is CommonJS that redirects to CJS preact
    mainFields: ['module'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    css: true,
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // Must be below test-utils
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
    coverage: {
      provider: 'v8',
      exclude: ['src/api', 'src/vite-env.d.ts'],
      thresholds: {
        statements: 85,
      },
    },
  },
});

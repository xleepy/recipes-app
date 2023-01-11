import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('mode', mode);
  const env = loadEnv(mode, process.cwd(), '');
  const define =
    mode === 'development'
      ? undefined
      : {
          VITE_APP_ID: env.VITE_APP_ID,
          VITE_APP_KEY: env.VITE_APP_KEY,
        };
  return {
    plugins: [preact()],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    define,
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat', // Must be below test-utils
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
  };
});

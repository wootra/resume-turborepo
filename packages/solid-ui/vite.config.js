import { defineConfig } from 'vite';
import solidjs from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [solidjs(), dts(), tsConfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
    },
    build: {
        lib: {
            entry: './src/index.tsx',
            name: 'SolidUI',
            fileName: 'solid-ui',
        },

        external: ['solid-js'],
    },
});

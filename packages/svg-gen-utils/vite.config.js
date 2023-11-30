import { defineConfig } from 'vite';
// import preact from '@preact/preset-vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // preact({
        //     reactAliasesEnabled: true,
        // }),
        react(),
        dts(),
        tsConfigPaths(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
    },
    build: {
        lib: {
            entry: './src/index.js',
            name: 'Svg Gen Utils',
            fileName: 'svg-gen-utils',
        },

        external: ['react', 'react-dom'],
    },
});

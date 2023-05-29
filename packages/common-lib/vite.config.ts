/// <reference types="vitest" />
import { PluginOption, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts() as PluginOption, tsConfigPaths() as PluginOption],
    test: {
        globals: true,
        setupFiles: 'tests/setup.js',
        include: ['src/**/*.test.{ts,js}'],
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'CommonLib',
            fileName: 'common-lib',
        },
    },
});

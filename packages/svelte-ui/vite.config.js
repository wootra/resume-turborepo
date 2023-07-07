import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// import { sveltekit } from '@sveltejs/kit/vite';
// import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), tsConfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'SvelteUI',
            fileName: 'svelte-ui',
        },
    },
});

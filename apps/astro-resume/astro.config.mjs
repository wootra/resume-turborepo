import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import vercel from '@astrojs/vercel/serverless';
// https://astro.build/config
export default defineConfig({
    vite: {
        assetsInclude: ['**/*.svg', '**/*.png'],
        define: {},
    },
    output: 'server',
    adapter: vercel(),
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        image({
            cacheDir: '.astro/cache',
        }),
        solid(),
        svelte(),
    ],
});

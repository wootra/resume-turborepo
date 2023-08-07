import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import vercel from '@astrojs/vercel/serverless';
// https://astro.build/config
export default defineConfig({
    vite: {
        assetsInclude: ['**/*.svg', '**/*.png', '**/*.ttf'],
        define: {},
    },
    output: 'server',
    adapter: vercel({
        includeFiles: [
            'src/assets/fonts/OpenSansEmoji.ttf',
            'src/assets/fonts/RobotoCondensed-Bold.ttf',
            'src/assets/fonts/RobotoCondensed-BoldItalic.ttf',
            'src/assets/fonts/RobotoCondensed-Italic.ttf',
            'src/assets/fonts/RobotoCondensed-Regular.ttf',
        ],
    }),
    integrations: [
        tailwind(),
        image({
            cacheDir: '.astro/cache',
        }),
        solid(),
        svelte(),
    ],
});

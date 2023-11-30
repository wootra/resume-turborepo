import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
// import preact from '@astrojs/preact';
// import image from '@astrojs/image';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        includeFiles: [
            'assets/fonts/OpenSansEmoji.ttf',
            'assets/fonts/RobotoCondensed-Bold.ttf',
            'assets/fonts/RobotoCondensed-BoldItalic.ttf',
            'assets/fonts/RobotoCondensed-Italic.ttf',
            'assets/fonts/RobotoCondensed-Regular.ttf',
        ],
    }),
    integrations: [
        tailwind(),
        // image({
        //     cacheDir: '.astro/cache',
        // }),
        solid({
            include: ['**/solid-games/**/*'],
        }),
        react({
            include: [
                '**/resume/**/*',
                '**/react-games/**/*',
                '**/react/**/*',
                '**/react-apps/**/*',
            ],
        }),
        // preact({
        //     compat: true,
        // }),
        svelte({}),
    ],
});

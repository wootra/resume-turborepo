import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import svelt from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [solid(), svelt()],
});

import { defineConfig } from 'astro/config';
// import solid from '@astrojs/solid-js';
// import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
// import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// import mdx from '@astrojs/mdx';
// import preact from '@astrojs/preact';
// import image from '@astrojs/image';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	site: 'https://utils.sh-jun.com',
	adapter: vercel({
		// imagesConfig: {
		//     cacheDir: '.astro/cache',
		// },
	}),

	integrations: [
		tailwind({
			nesting: true,
		}), // image({
		//     cacheDir: '.astro/cache',
		// }),
		// solid({
		// 	include: ['**/solid-games/**/*'],
		// }),
		// react({
		// 	include: [
		// 		'**/resume/**/*',
		// 		'**/react-games/**/*',
		// 		'**/react/**/*',
		// 		'**/react-apps/**/*',
		// 		'**/react-libraries/**/*',
		// 	],
		// }),
		// preact({
		//     compat: true,
		// }),
		// mdx({
		// 	syntaxHighlight: true,
		// }),
		// svelte({}),
		icon(),
		sitemap(),
	],
});

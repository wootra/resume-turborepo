import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
// import preact from '@astrojs/preact';
// import image from '@astrojs/image';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://www.sh-jun.com',
	adapter: vercel({
		includeFiles: [
			'assets/fonts/OpenSansEmoji.ttf',
			'assets/fonts/RobotoCondensed-Bold.ttf',
			'assets/fonts/RobotoCondensed-BoldItalic.ttf',
			'assets/fonts/RobotoCondensed-Italic.ttf',
			'assets/fonts/RobotoCondensed-Regular.ttf',
			'assets/fonts3d/droid_sans_bold.typeface.json',
			'assets/textures/stone.jpg',
			'assets/textures/f-texture.png',
			'assets/textures/profile-photo150.png',
		],
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
		solid({
			include: ['**/solid-games/**/*'],
		}),
		react({
			include: [
				'**/resume/**/*',
				'**/react-games/**/*',
				'**/react/**/*',
				'**/react-apps/**/*',
				'**/react-libraries/**/*',
			],
		}), // preact({
		//     compat: true,
		// }),
		mdx({
			syntaxHighlight: true,
		}),
		svelte({}),
		icon(),
		sitemap(),
	],
});

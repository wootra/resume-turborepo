// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Dream Reader',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/wootra/dream-reader-customer-service/tree/main',
				},
			],
			sidebar: [
				{
					label: '사용 방법',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '설치 방법', slug: 'guides/how-to-install' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],

	adapter: node({
		mode: 'standalone',
	}),
});

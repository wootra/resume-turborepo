// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics'
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				starlightSidebarTopics([
					{
						label: {
							kr: '문서',
							en: 'Documents',
						},
						id: 'documents',
						link: 'documents',
						items: [
							'how-to-install', 'privacy-policy', 'terms-cond'
						]
					},

					// {
					// 	label: {
					// 		kr: '설치방법',
					// 		en: 'Getting Started',
					// 	},
					// 	id: 'how-to-install',
					// 	link: 'kr/how-to-install'
					// },

					// {
					// 	label: {
					// 		kr: '개인정보 처리방침',
					// 		en: 'Privacy Policy',
					// 	},
					// 	id: 'privacy-policy',
					// 	link: '/privacy-policy',
					// },
					// {
					// 	label: {
					// 		kr: '서비스 이용 약관',
					// 		en: 'Terms & Conditions',
					// 	},
					// 	id: 'terms-cond',
					// 	link: '/terms-cond',
					// },
				]),
			],
			title: 'Dream Reader',
			defaultLocale: 'en',
			locales: {
				kr: {
					label: '한국어',
					lang: 'kr',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/wootra/dream-reader-customer-service/tree/main',
				},
			],
			
		}),
	],

	adapter: node({
		mode: 'standalone',
	}),
});

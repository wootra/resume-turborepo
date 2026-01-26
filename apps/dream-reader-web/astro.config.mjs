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
							kr: 'Dream Reader 에 오신것을 환영합니다.',
							en: 'Welcome to Dream Reader',
						},
						link: '/'
					},
					{
						label: {
							kr: '설치방법',
							en: 'Getting Started',
						},
						link: 'how-to-install'
					},

					{
						label: {
							kr: '개인정보 처리방침',
							en: 'Privacy Policy',
						},
						link: 'privacy-policy',
					},
					{
						label: {
							kr: '서비스 이용 약관',
							en: 'Terms & Conditions',
						},
						link: 'terms-cond',
					},
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

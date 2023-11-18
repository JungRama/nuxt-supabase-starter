// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ui: {
		icons: ['lucide'],
	},
	supabase: {
		redirect: false,
		// redirectOptions: {
		// 	login: '/sign-in',
		// 	callback: '/confirm',
		// 	exclude: ['/', '/sign-up', '/code/:id'],
		// },
	},
	runtimeConfig: {
		public: {
			APP_URL: process.env.APP_URL,
		},
	},
	modules: [
		'@nuxt/ui',
		'nuxt-icon',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
		'@nuxtjs/supabase',
		// [
		// 	'@nuxtjs/i18n',
		// 	{
		// 		locales: ['en', 'in'],
		// 		defaultLocale: 'en',
		// 		vueI18n: {
		// 			fallbackLocale: 'en',
		// 			messages: {
		// 				en: {
		// 					greeting: 'Hello world!',
		// 				},
		// 				id: {
		// 					greeting: '¡Hola mundo!',
		// 				},
		// 			},
		// 		},
		// 	},
		// ],
	],
})

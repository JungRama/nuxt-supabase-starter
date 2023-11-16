// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ui: {
		icons: ['lucide'],
	},
	supabase: {
		redirectOptions: {
			login: '/sign-in',
			callback: '/confirm',
			exclude: [],
		},
	},
	modules: [
		'@nuxt/ui',
		'nuxt-icon',
		'@nuxtjs/color-mode',
		'@pinia/nuxt',
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

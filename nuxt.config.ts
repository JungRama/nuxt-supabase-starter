// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ui: {
		icons: ['lucide'],
	},
	supabase: {
		redirect: false,
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
		'@nuxt/content',
	],
})

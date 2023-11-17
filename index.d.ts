export interface I18nConfig {
	defaultLocale: string
	locales: string[]
}

declare module 'nuxt/schema' {
	interface AppConfig {
		i18n: I18nConfig
	}
}

export {}

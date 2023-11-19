export const charts = [
	{
		title: 'Notes',
		icon: 'i-lucide-terminal-square',
		subTitle: 'This chart is dummy',
		total: 100000,
	},
	{
		title: 'Storage Used',
		icon: 'i-lucide-terminal-square',
		subTitle: 'This chart is dummy',
		total: 20000,
	},
	{
		title: 'Used Quota',
		icon: 'i-lucide-terminal-square',
		subTitle: 'This chart is dummy',
		total: 40000,
	},
	{
		title: 'Credibility',
		icon: 'i-lucide-terminal-square',
		subTitle: 'This chart is dummy',
		total: 80000,
	},
]

export const library = [
	{
		title: 'nuxt/ui',
		description: 'Ui library provided by Nuxt JS',
		isDone: true,
	},
	{
		title: 'nuxt/icon',
		description: 'Ui library provided by Nuxt JS',
		isDone: true,
	},
	{
		title: 'nuxtjs/color-mode',
		description: 'Ui library provided by Nuxt JS',
		isDone: true,
	},
	{
		title: 'vueuse/nuxt',
		description: 'Ui library provided by Nuxt JS',
		isDone: true,
	},
	{
		title: 'nuxtjs/supabase',
		description: 'Ui library provided by Nuxt JS',
		isDone: true,
	},
	{
		title: 'nuxtjs/i18n',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'pinia/nuxt',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'vue-chart-js',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'yup',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'monaco-editor',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'date-fns',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
	{
		title: 'underscore',
		description: 'Ui library provided by Nuxt JS',
		isDone: false,
	},
]

export const feature = [
	{
		title: 'Authentication',
		isDone: true,
		children: [
			{
				title: 'Local Auth',
				isDone: true,
			},
			{
				title: 'Oauth with Github',
				isDone: true,
			},
		],
	},
	{
		title: 'Realtime Code Editor',
		isDone: true,
		children: [
			{
				title: 'CRUD',
				isDone: true,
			},
			{
				title: 'Share to Public',
				isDone: true,
			},
			{
				title: 'Realtime listener',
				isDone: true,
			},
		],
	},
	{
		title: 'Storage',
		isDone: true,
		children: [
			{
				title: 'Upload',
				isDone: true,
			},
			{
				title: 'Delete File',
				isDone: true,
			},
		],
	},
	{
		title: 'Supabase',
		isDone: true,
		children: [
			{
				title: 'Migration',
				isDone: true,
			},
			{
				title: 'Row-Level Security Database',
				isDone: true,
			},
			{
				title: 'Row-Level Security Storage',
				isDone: true,
			},
		],
	},
]

const useCodeFetch = () => {
	const toast = useToast()
	const client = useSupabaseClient()

	const {
		data,
		refresh,
		pending: isLoadingData,
		execute,
	} = useAsyncData(
		'codes',
		async () => {
			const { data } = await client
				.from('codes')
				.select('id, title, updated_at')
			return data
		},
		{
			immediate: false,
		}
	)

	const detailId = ref<null | string>(null)
	const {
		data: dataDetail,
		pending: isLoadingDataDetail,
		execute: executeDataDetail,
	} = useAsyncData(
		'restaurant',
		async () => {
			const { data } = await client
				.from('codes')
				.select('id, title, language, updated_at, is_public,code')
				.eq('id', detailId.value as string)
				.single()
			return data
		},
		{
			immediate: false,
		}
	)

	const isLoading = reactive({
		create: false,
		remove: false,
		update: false,
		removeId: '',
	})

	const create = async () => {
		try {
			isLoading.create = true
			// @ts-expect-error
			const { data, error } = await client
				.from('codes')
				.insert([
					{
						title: 'Untitled Code',
						code: `<html>Welcome to Nuxt Supabase Starter</html>`,
						updated_at: new Date(),
					},
				])
				.select()
				.single()

			if (error) {
				throw error.message
			}

			isLoading.create = false

			return data
		} catch (error) {
			isLoading.create = false
			toast.add({
				color: 'red',
				icon: 'i-lucide-alert-triangle',
				title: error as string,
			})
		}
	}

	const update = async (
		id: string,
		input: {
			name?: string
			language?: string
			code?: string
			is_public?: boolean
		}
	) => {
		try {
			isLoading.update = true

			const dataToUpdate = {
				...(input.name && { title: input.name }),
				...(input.language && { language: input.language }),
				...(input.code && { code: input.code }),
				...(input.is_public && { is_public: input.is_public }),
				updated_at: new Date(),
			}

			const { data, error } = await client
				.from('codes')
				.update(dataToUpdate as never)
				.eq('id', id)

			if (error) {
				throw error.message
			}

			isLoading.update = false

			return data
		} catch (error) {
			isLoading.update = false
			toast.add({
				color: 'red',
				icon: 'i-lucide-alert-triangle',
				title: error as string,
			})
		}
	}

	const remove = async (id: string) => {
		try {
			isLoading.remove = true
			isLoading.removeId = id
			const { error } = await client.from('codes').delete().eq('id', id)

			if (error) {
				throw error.message
			}

			refresh()
			isLoading.remove = false
		} catch (error) {
			isLoading.remove = false
			toast.add({
				color: 'red',
				icon: 'i-lucide-alert-triangle',
				title: error as string,
			})
		}
	}

	return {
		data: data,
		loadingData: isLoadingData,
		executeData: execute,

		loadingState: isLoading,

		executeCreate: create,
		executeRemove: remove,

		dataDetail,
		setDetailId: (id: string) => (detailId.value = id),
		loadingDataDetail: isLoadingDataDetail,
		executeDataDetail,

		update,
	}
}

export default useCodeFetch

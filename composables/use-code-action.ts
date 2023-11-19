import { useCodeQuery } from '~/composables/query/code'
import { BaseError, useErrorHandler } from '~/composables/use-error-handler'

const useCodeAction = () => {
	const { errorHandler } = useErrorHandler()
	const { get, getById, create, update, remove } = useCodeQuery()

	const loadingState = reactive<{
		get: boolean
		getById: boolean
		create: boolean
		remove: boolean
		removeOnId: string | null
		update: boolean
	}>({
		get: true,
		getById: true,
		create: false,
		remove: false,
		removeOnId: null,
		update: false,
	})

	const actionGet = async () => {
		try {
			loadingState.get = true

			const { data, error } = await get()

			if (error) {
				throw new BaseError(error.code, error.message)
			}

			loadingState.get = false
			return data
		} catch (error) {
			loadingState.get = false
			errorHandler(error as BaseError)
		}
	}

	const actionGetById = async (id: string) => {
		try {
			loadingState.getById = true

			const { data, error } = await getById(id)

			if (error) {
				throw new BaseError(error.code, error.message)
			}

			loadingState.getById = false
			return data
		} catch (error) {
			loadingState.getById = false
			errorHandler(error as BaseError)
		}
	}

	const actionCreate = async () => {
		try {
			loadingState.create = true

			const { data, error } = await create()

			if (error) {
				throw new BaseError(error.code, error.message)
			}

			loadingState.create = false
			return data
		} catch (error) {
			loadingState.create = false
			errorHandler(error as BaseError)
		}
	}

	const actionUpdate = async (
		id: string,
		input: {
			name?: string
			language?: string
			code?: string
			is_public?: boolean
		}
	) => {
		try {
			loadingState.update = true

			const dataToUpdate = {
				...(input.name && { title: input.name }),
				...(input.language && { language: input.language }),
				...(input.code && { code: input.code }),
				...(input.is_public !== undefined
					? { is_public: input.is_public }
					: {}),
				updated_at: new Date(),
			}

			const { data, error } = await update(id, dataToUpdate)

			if (error) {
				throw new BaseError(error.code, error.message)
			}

			loadingState.update = false
			return data
		} catch (error) {
			loadingState.update = false
			errorHandler(error as BaseError)
		}
	}

	const actionRemove = async (id: string) => {
		try {
			loadingState.remove = true
			loadingState.removeOnId = id

			const { data, error } = await remove(id)

			if (error) {
				throw new BaseError(error.code, error.message)
			}

			loadingState.remove = false
			loadingState.removeOnId = null
			return data
		} catch (error) {
			loadingState.remove = false
			loadingState.removeOnId = null
			errorHandler(error as BaseError)
		}
	}

	return {
		loadingState,

		actionGet,
		actionGetById,
		actionCreate,
		actionUpdate,
		actionRemove,
	}
}

export default useCodeAction

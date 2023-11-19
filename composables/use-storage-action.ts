import { useStorageQuery } from '~/composables/query/storage'
import { BaseError, useErrorHandler } from '~/composables/use-error-handler'

const useStorageAction = () => {
	const { errorHandler } = useErrorHandler()
	const { get, getImageDetail, upload, remove } = useStorageQuery()

	const loadingState = reactive<{
		get: boolean
		getImageDetail: boolean
		upload: boolean
		remove: boolean
	}>({
		get: true,
		getImageDetail: false,
		upload: false,
		remove: false,
	})

	const actionGet = async (path: string) => {
		try {
			loadingState.get = true

			const { data, error } = await get(path)

			if (error) {
				throw new BaseError(400, error.message)
			}

			loadingState.get = false
			return data
		} catch (error) {
			loadingState.get = false
			errorHandler(error as BaseError)
		}
	}

	const actionGetImageDetail = async (path: string) => {
		try {
			loadingState.getImageDetail = true

			console.log(path)

			const { data, error } = await getImageDetail(path)

			if (error) {
				throw new BaseError(400, error.message)
			}

			loadingState.getImageDetail = false
			return data
		} catch (error) {
			loadingState.getImageDetail = false
			errorHandler(error as BaseError)
		}
	}

	const actionUpload = async (file: File, path: string, fileName: string) => {
		try {
			loadingState.upload = true

			const { data, error } = await upload(file, path, fileName)

			if (error) {
				throw new BaseError(400, error.message)
			}

			loadingState.upload = false
			return data
		} catch (error) {
			loadingState.upload = false
			errorHandler(error as BaseError)
		}
	}

	const actionRemove = async (path: string, fileName: string) => {
		try {
			loadingState.remove = true

			const { data, error } = await remove(path, fileName)

			if (error) {
				throw new BaseError(400, error.message)
			}

			loadingState.remove = false
			return data
		} catch (error) {
			loadingState.remove = false
			errorHandler(error as BaseError)
		}
	}

	return {
		loadingState,

		actionGet,
		actionGetImageDetail,
		actionUpload,
		actionRemove,
	}
}

export default useStorageAction

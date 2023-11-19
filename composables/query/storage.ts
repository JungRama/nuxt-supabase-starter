import type { Database } from '~/supabase/database.types'

export const useStorageQuery = () => {
	const client = useSupabaseClient<Database>()
	const BUCKET_NAME = 'bucket-name'

	/**
	 * Retrieves data from the specified path in the storage.
	 *
	 * @param {string} path - The path to retrieve data from.
	 * @return {Promise<{data, error}>} - An object containing the retrieved data and any error that occurred.
	 */
	const get = async (path: string) => {
		const { data, error } = await client.storage.from(BUCKET_NAME).list(path, {
			limit: 5,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		})

		return {
			data,
			error,
		}
	}

	/**
	 * Retrieves the details of an image url.
	 *
	 * @param {string} path - The path of the image.
	 * @return {Promise<{ data, error }>} - The result of the function, which includes the image data and any potential error.
	 */
	const getImageDetail = async (path: string) => {
		const { data, error } = await client.storage
			.from(BUCKET_NAME)
			.createSignedUrl(`${path}`, 60)

		return {
			data,
			error,
		}
	}

	/**
	 * Uploads a file to the specified path in the storage bucket.
	 *
	 * @param {File} file - The file object to be uploaded.
	 * @param {string} path - The path where the file will be stored.
	 * @param {string} fileName - The name of the file.
	 * @return {Promise<{ data, error }>} - An object containing the data and error properties.
	 */
	const upload = async (file: File, path: string, fileName: string) => {
		const { data, error } = await client.storage
			.from(BUCKET_NAME)
			.upload(`${path}/${fileName}`, file, {
				upsert: true,
			})

		return {
			data,
			error,
		}
	}

	/**
	 * Removes a file from a specified path.
	 *
	 * @param {string} path - The path where the file is located.
	 * @param {string} fileName - The name of the file to be removed.
	 * @return {Promise<{data, error}>} - An object with the removed data and any potential error.
	 */
	const remove = async (path: string, fileName: string) => {
		const { data, error } = await client.storage
			.from(BUCKET_NAME)
			.remove([`${path}/${fileName}`])

		return {
			data,
			error,
		}
	}

	return {
		get,
		upload,
		getImageDetail,
		remove,
	}
}

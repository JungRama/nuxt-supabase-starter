import type { Database } from '~/supabase/database.types'

export const useStorageQuery = () => {
	const client = useSupabaseClient<Database>()
	const BUCKET_NAME = 'bucket-name'

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

	const getImageDetail = async (path: string) => {
		const { data, error } = await client.storage
			.from(BUCKET_NAME)
			.createSignedUrl(`${path}`, 60)

		return {
			data,
			error,
		}
	}

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

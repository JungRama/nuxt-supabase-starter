import type { Database } from '~/supabase/database.types'

export const useCodeQuery = () => {
	const client = useSupabaseClient<Database>()

	/**
	 * Retrieves data from the 'codes' table.
	 *
	 * @return {Promise<{ data, error }>} An object containing the retrieved data and any error that occurred.
	 */
	const get = async () => {
		const { data, error } = await client
			.from('codes')
			.select('id, title, updated_at')
			.order('created_at', { ascending: false })

		return {
			data,
			error,
		}
	}

	/**
	 * Retrieves realtime updates for a specific ID.
	 *
	 * @param {string} id - The ID of the item to get updates for.
	 * @param {function} onNewUpdate - A callback function to handle new updates.
	 */
	const getRealtimeById = (id: string, onNewUpdate: (payload: any) => void) => {
		client
			.channel(`code-${id}`)
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'codes', filter: `id=eq.${id}` },
				(payload) => {
					onNewUpdate(payload)
				}
			)
			.subscribe()
	}

	/**
	 * Retrieves a code entry from the database by its ID.
	 *
	 * @param {string} id - The ID of the code entry to retrieve.
	 * @return {Promise<{data, error}>} - An object containing the retrieved data and any potential error.
	 */
	const getById = async (id: string) => {
		const { data, error } = await client
			.from('codes')
			.select('id, title, language, updated_at, is_public, code')
			.eq('id', id)
			.single()

		return {
			data,
			error,
		}
	}

	/**
	 * Creates a new record in the 'codes' table and returns the inserted data and any error that occurred.
	 *
	 * @return {Promise<{data, error}>} An object containing the inserted data and any error that occurred.
	 */
	const create = async () => {
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

		return {
			data,
			error,
		}
	}

	/**
	 * Updates a record in the 'codes' table with the specified data.
	 *
	 * @param {Record<string, any>} dataToUpdate - The data to update the record with.
	 * @param {string} id - The ID of the record to update.
	 * @return {Promise<{ data, error }>} - A promise that resolves to an object containing the updated data and any error that occurred.
	 */
	const update = async (
		id: string,
		input: {
			name?: string
			language?: string
			code?: string
			is_public?: boolean
		}
	) => {
		const { data, error } = await client
			.from('codes')
			.update(input)
			.eq('id', id)

		return {
			data,
			error,
		}
	}

	/**
	 * Removes a record from the 'codes' table based on the provided ID.
	 *
	 * @param {string} id - The ID of the record to be removed.
	 * @return {Promise<{ data, error }>} - An object containing the data and error properties.
	 */
	const remove = async (id: string) => {
		const { data, error } = await client.from('codes').delete().eq('id', id)

		return {
			data,
			error,
		}
	}

	return {
		get,
		getRealtimeById,
		getById,
		create,
		update,
		remove,
	}
}

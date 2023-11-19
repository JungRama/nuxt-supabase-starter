export class BaseError {
	code: number
	message: string

	/**
	 * Constructs a new instance of the class.
	 *
	 * @param {string | number | undefined} code - The code parameter of the function.
	 * @param {string} message - The message parameter of the function.
	 */
	constructor(code: string | number | undefined, message: string) {
		this.code = (() => {
			if (code === undefined) {
				return 500
			}

			if (typeof code === 'string') {
				// Code from postgrees error
				// -> extend the postgrees error to status code here
				if (code == 'PGRST116') {
					// The result contains 0 rows
					return 404
				}

				return parseInt(code)
			} else {
				return code
			}
		})()

		this.message = message
	}
}

/**
 * A function that handles errors and displays toast or error page based on the error code.
 *
 * @param {BaseError} error - The error object containing the error code and message.
 */
export const useErrorHandler = () => {
	const toast = useToast()

	const errorHandler = (error: BaseError) => {
		switch (error.code) {
			case 404:
				showError({
					statusCode: 404,
					statusMessage: 'Page Not Found',
				})
				break
			case 401:
				showError({
					statusCode: error.code,
					statusMessage: `Unauthenticated: (${error.message})`,
				})
				break
			case 403:
				showError({
					statusCode: error.code,
					statusMessage: `Access Forbidden: (${error.message})`,
				})
				break
			case 500:
				showError({
					statusCode: error.code,
					statusMessage: `Internal Server Error: (${error.message})`,
				})
				break
			case 503:
				showError({
					statusCode: error.code,
					statusMessage: `Service Unavailable: (${error.message})`,
				})
				break
			default:
				toast.add({
					color: 'red',
					icon: 'i-lucide-alert-triangle',
					title: error.message,
				})
				break
		}
	}

	return {
		errorHandler,
	}
}

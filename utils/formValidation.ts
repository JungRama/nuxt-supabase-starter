import { object, string, type InferType } from 'yup'

export const signInValidation = object({
	email: string().email('Invalid email').required('Field is required'),
	password: string()
		.min(8, 'Must be at least 8 characters')
		.required('Field is required'),
})

export type SchemaSignInValidation = InferType<typeof signInValidation>

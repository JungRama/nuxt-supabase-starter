import { object, string, type InferType } from 'yup'

export const signInValidation = object({
	email: string().email('Invalid email').required('Field is required'),
	password: string()
		.min(8, 'Must be at least 8 characters')
		.required('Field is required'),
})

export type SchemaSignInValidation = InferType<typeof signInValidation>

export const signUpValidation = object({
	email: string().email('Invalid email').required('Field is required'),
	password: string()
		.min(8, 'Must be at least 8 characters')
		.required('Field is required'),
})

export type SchemaSignUpValidation = InferType<typeof signUpValidation>

export const forgotPasswordValidation = object({
	email: string().email('Invalid email').required('Field is required'),
})

export type SchemaForgotPasswordValidation = InferType<
	typeof forgotPasswordValidation
>

export const resetPasswordValidation = object({
	password: string()
		.min(8, 'Must be at least 8 characters')
		.required('Field is required'),
})

export type SchemaResetPasswordValidation = InferType<
	typeof resetPasswordValidation
>

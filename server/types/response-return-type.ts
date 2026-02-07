declare global {
	interface ResponseReturnType {
		statusCode: number
		message: string
		data?: Record<string, any>
		error?: string
	}
}

export {}

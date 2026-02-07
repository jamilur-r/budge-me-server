import { H3Event, eventHandler } from "h3"

const VALID_TOKENS = (process.env.API_TOKENS || "").split(",").filter(Boolean)

// Nitro middleware - logs all incoming requests
export default eventHandler(event => {
	return requireApiToken(event)
})

async function verifyApiToken(event: H3Event): Promise<boolean> {
	// Get token from Authorization header
	const authHeader = getHeader(event, "x-api-token")

	if (!authHeader) {
		return false
	}

	// Extract token from "Bearer <token>" format
	const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

	return VALID_TOKENS.includes(token.trim())
}

async function requireApiToken(event: H3Event): Promise<void> {
	const isValid = await verifyApiToken(event)

	if (!isValid) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
			data: {
				message: "Invalid or missing API token",
			},
		})
	}
}

// Helper to get header value
function getHeader(event: H3Event, name: string): string | undefined {
	const value = event.headers.get(name)
	return value ?? undefined
}

// Helper to create error
function createError(options: {
	statusCode: number
	statusMessage: string
	data?: any
}): Error & { statusCode: number; statusMessage: string } {
	const error = new Error(options.statusMessage) as any
	error.statusCode = options.statusCode
	error.statusMessage = options.statusMessage
	error.data = options.data
	return error
}

import { createError, eventHandler, getRequestURL } from "h3"
import { getFirebaseAuth } from "../utils/firebase"

const PUBLIC_URLS = ["/ping", "/carousel"]

export default eventHandler(async event => {
	if (PUBLIC_URLS.includes(getRequestURL(event).pathname)) {
		return
	}

	const auth = getFirebaseAuth()

	const authHeader = event.req.headers["authorization"]

	if (!authHeader) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
			data: {
				message: "You are not authorized. Maybe you forgot to signin?",
			},
		})
	}

	const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

	try {
		await auth.verifyIdToken(token)
		const user = await auth.getUser((await auth.verifyIdToken(token)).uid)
		event.context.user = user
	} catch (error) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
			data: {
				message: "Invalid or expired token. Please signin again.",
			},
		})
	}
})

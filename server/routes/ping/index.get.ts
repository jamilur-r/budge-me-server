import { eventHandler } from "h3"

export default eventHandler(async event => {
	return {
		statusCode: 200,
		message: "Server said pong",
	}
})

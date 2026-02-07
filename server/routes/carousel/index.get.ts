import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { CarouselTable } from "server/utils/schema"

export default eventHandler(async event => {
	try {
		const carousels = await db.select().from(CarouselTable)

		return {
			statusCode: 200,
			message: "Carousels fetched successfully",
			data: carousels,
		}
	} catch (error) {
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			message: "Failed to fetch carousels",
			data: null,
		})
	}
})

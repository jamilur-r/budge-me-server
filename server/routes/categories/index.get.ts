import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { CategoryGroupTable } from "server/utils/schema"

export default eventHandler(async _event => {
	try {
		const categories = await db.select().from(CategoryGroupTable)

		return {
			statusCode: 200,
			message: "Categories fetched successfully.",
			data: { categories },
		}
	} catch (error) {
		console.log(error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
			data: {
				message: "An error occurred while processing the request.",
			},
		})
	}
})

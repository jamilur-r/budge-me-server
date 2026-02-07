import { eq } from "drizzle-orm"
import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { AccountTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user.uid

		const accounts = await db.query.AccountTable.findMany({
			where: () => eq(AccountTable.userId, userId),
		}).execute()

		return {
			statusCode: 200,
			message: "Fetched accounts successfully",
			data: {
				accounts: accounts,
			},
		}
	} catch (error) {
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			data: {
				message: "An error occurred while fetching accounts.",
			},
		})
	}
})

import { eq } from "drizzle-orm"
import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { UserProfileTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user.uid

		const profle = await db.query.UserProfileTable.findFirst({
			where: eq(UserProfileTable.userId, userId),
		})

		if (!profle) {
			await db.insert(UserProfileTable).values({
				userId: userId,
				isAccountSetupComplete: true,
			})
			return {
				statusCode: 200,
				message: "Account setup not complete.",
				data: { isAccountSetupComplete: true, hasAccounts: true },
			}
		}
		await db
			.update(UserProfileTable)
			.set({ isAccountSetupComplete: true })
			.where(eq(UserProfileTable.userId, userId))

		return {
			statusCode: 200,
			message: "Account setup marked as complete.",
			data: {
				isAccountSetupComplete: true,
				hasAccounts: true,
			},
		}
	} catch (error) {
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			data: { message: "An error occurred while checking account setup." },
		})
	}
})

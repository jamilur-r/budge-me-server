import { eq } from "drizzle-orm"
import { eventHandler } from "h3"
import db from "server/utils/db"
import { UserProfileTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	const user = event.context.user

	if (!user) {
		return {
			statusCode: 200,
			message: "User not authenticated",
			data: { isAccountSetupComplete: false, hasAccounts: false },
		}
	}

	const userId = user.uid
	const profile = await db.query.UserProfileTable.findFirst({
		where: () => eq(UserProfileTable.userId, userId),
	}).execute()

	const hasAccounts = await db.query.AccountTable.findFirst({
		where: () => eq(UserProfileTable.userId, userId),
	}).execute()

	return {
		statusCode: 200,
		message: "Fetched account setup status",
		data: {
			isSetupComplete: profile ? profile.isAccountSetupComplete : false,
			hasAccounts: !!hasAccounts,
		},
	}
})

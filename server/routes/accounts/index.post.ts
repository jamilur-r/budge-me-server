import { eq } from "drizzle-orm"
import { createError, eventHandler, readBody } from "h3"
import db from "server/utils/db"
import { AccountTable, UserProfileTable } from "server/utils/schema"

export default eventHandler(async event => {
	try {
		const userId = event.context.user.uid

		const profile = await db.query.UserProfileTable.findFirst({
			where: () => eq(UserProfileTable.userId, userId),
		}).execute()

		const isAccountSteupComplete = profile?.isAccountSetupComplete ?? false

		if (!isAccountSteupComplete) {
			const hasAccounts = await db.query.AccountTable.findMany({
				where: () => eq(UserProfileTable.userId, userId),
			}).execute()

			if (hasAccounts.length > 0) {
				await db
					.delete(UserProfileTable)
					.where(eq(UserProfileTable.userId, userId))
					.execute()
			}
		}

		const body = await readBody(event)

		const accounts = body.accounts.map((account: any) => ({
			userId: userId,
			accountType: account.accountType,
			name: account.name?.trim(),
			balance: account.balance,
			currency: account.currency.trim().toUpperCase(),
		}))

		await db.insert(AccountTable).values(accounts).execute()

		return {
			statusCode: 200,
			message: "Accounts added successfully",
			data: {
				addedAccounts: accounts.length,
				accounts: accounts,
			},
		}
	} catch (error) {
		console.log(error)
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			data: {
				message: "An error occurred while adding accounts.",
			},
		})
	}
})

import { createError, eventHandler, readBody } from "h3"
import db from "server/utils/db"
import { AccountTable } from "server/utils/schema"

export default eventHandler(async event => {
	try {
		const userId = event.context.user.uid
		const body = await readBody(event)

		const accounts = body.accounts.map((account: Record<string, string>) => ({
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

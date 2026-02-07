import { and, eq } from "drizzle-orm"
import { createError, eventHandler, readBody } from "h3"
import db from "server/utils/db"
import { AccountTable, MonthlyBudgetTable, TransactionTable } from "server/utils/schema"

interface CreateTransactionPayload {
	title: string
	category: string
	groupId: string
	budgetId: string
	accountId: string
	amount: number
	type: "INCOME" | "EXPENSE" | "TRANSFER"
	memo?: string
	date: string
}

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user?.uid

		// 1. Authentication check
		if (!userId) {
			return createError({
				statusCode: 401,
				message: "Unauthorized",
				data: { message: "User authentication required." },
			})
		}

		// 2. Read and validate request body
		const body = await readBody(event)

		if (!Array.isArray(body.transactions) || body.transactions.length === 0) {
			return createError({
				statusCode: 400,
				message: "Bad Request",
				data: { message: "Request body must be a non-empty array of transactions." },
			})
		}

		// 3. Validate transaction structure and required fields
		const transactions: CreateTransactionPayload[] = body.transactions

		for (const tx of transactions) {
			if (
				!tx.title?.trim() ||
				!tx.category?.trim() ||
				!tx.groupId ||
				!tx.budgetId ||
				!tx.accountId ||
				tx.amount === undefined ||
				!tx.type ||
				!tx.date
			) {
				return createError({
					statusCode: 400,
					message: "Bad Request",
					data: {
						message:
							"Each transaction must have title, category, groupId, budgetId, accountId, amount, type, and date.",
					},
				})
			}

			if (!["INCOME", "EXPENSE", "TRANSFER"].includes(tx.type)) {
				return createError({
					statusCode: 400,
					message: "Bad Request",
					data: {
						message: "Invalid transaction type. Must be INCOME, EXPENSE, or TRANSFER.",
					},
				})
			}

			if (typeof tx.amount !== "number" || tx.amount <= 0) {
				return createError({
					statusCode: 400,
					message: "Bad Request",
					data: { message: "Transaction amount must be a positive number." },
				})
			}
		}

		// 4. Verify all referenced resources belong to the user
		const validAccounts = await db
			.select({ id: AccountTable.id })
			.from(AccountTable)
			.where(and(eq(AccountTable.userId, userId)))

		const validAccountIds = new Set(validAccounts.map(a => a.id))

		for (const tx of transactions) {
			if (!validAccountIds.has(tx.accountId)) {
				return createError({
					statusCode: 404,
					message: "Not Found",
					data: {
						message: `Account ${tx.accountId} not found or does not belong to user.`,
					},
				})
			}
		}

		const validBudgets = await db
			.select({ id: MonthlyBudgetTable.id })
			.from(MonthlyBudgetTable)
			.where(eq(MonthlyBudgetTable.userId, userId))

		const validBudgetIds = new Set(validBudgets.map(b => b.id))

		for (const tx of transactions) {
			if (!validBudgetIds.has(tx.budgetId)) {
				return createError({
					statusCode: 404,
					message: "Not Found",
					data: {
						message: `Budget ${tx.budgetId} not found or does not belong to user.`,
					},
				})
			}
		}

		// 5. Execute in a database transaction (atomicity)
		let createdCount = 0

		await db.transaction(async tx => {
			for (const transactionData of transactions) {
				// Derive budget month from transaction date
				const txDate = new Date(transactionData.date)
				const month = txDate.toISOString().slice(0, 7) // "YYYY-MM"

				// Verify the monthly_budgets row matches this month
				const monthlyBudget = await tx
					.select()
					.from(MonthlyBudgetTable)
					.where(
						and(
							eq(MonthlyBudgetTable.id, transactionData.budgetId),
							eq(MonthlyBudgetTable.userId, userId),
							eq(MonthlyBudgetTable.month, month)
						)
					)
					.limit(1)

				if (monthlyBudget.length === 0) {
					throw new Error(
						`Monthly budget ${transactionData.budgetId} for month ${month} not found.`
					)
				}

				// Store amount as positive for all transaction types
				// Sign is determined by the transaction type field
				const amount = Math.abs(transactionData.amount).toFixed(2)

				// 6. Insert transaction
				await tx.insert(TransactionTable).values({
					userId: userId,
					groupId: transactionData.groupId,
					budgetId: transactionData.budgetId,
					title: transactionData.title.trim(),
					category: transactionData.category.trim(),
					accountId: transactionData.accountId,
					amount: amount,
					type: transactionData.type,
					memo: transactionData.memo?.trim() || null,
					date: txDate,
				})

				// 7. Update monthly_budgets.remaining for EXPENSE only
				if (transactionData.type === "EXPENSE") {
					const currentBudget = monthlyBudget[0]
					const newRemaining = (
						parseFloat(currentBudget.remaining) - transactionData.amount
					).toFixed(2)

					await tx
						.update(MonthlyBudgetTable)
						.set({
							remaining: newRemaining,
							updatedAt: new Date(),
						})
						.where(eq(MonthlyBudgetTable.id, transactionData.budgetId))
				}

				// 8. Update account balance
				const account = await tx
					.select()
					.from(AccountTable)
					.where(
						and(
							eq(AccountTable.id, transactionData.accountId),
							eq(AccountTable.userId, userId)
						)
					)
					.limit(1)

				if (account.length > 0) {
					let newBalance: number

					if (transactionData.type === "EXPENSE") {
						newBalance = parseFloat(account[0].balance) - transactionData.amount
					} else if (transactionData.type === "INCOME") {
						newBalance = parseFloat(account[0].balance) + transactionData.amount
					} else if (transactionData.type === "TRANSFER") {
						// For transfers, we'll assume it's being transferred out (deducted)
						newBalance = parseFloat(account[0].balance) - transactionData.amount
					} else {
						newBalance = parseFloat(account[0].balance)
					}

					await tx
						.update(AccountTable)
						.set({
							balance: newBalance.toFixed(2),
							updatedAt: new Date(),
						})
						.where(eq(AccountTable.id, transactionData.accountId))
				}

				createdCount++
			}
		})

		return {
			statusCode: 201,
			message: "Transactions created successfully",
			data: {
				count: createdCount,
			},
		}
	} catch (error) {
		console.error("Error creating transactions:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
			data: { message: "An error occurred while processing the request." },
		})
	}
})

import dayjs from "dayjs"
import { and, desc, eq } from "drizzle-orm"
import { createError, eventHandler, readBody } from "h3"
import db from "server/utils/db"
import { AccountTable, MonthlyBudgetTable, TransactionTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const body = await readBody(event)
		const userId = event.context.user.uid

		if (
			!body.title?.trim() ||
			!body.groupId ||
			!body.accountId ||
			body.amount === undefined ||
			Number.isNaN(parseFloat(body.amount)) ||
			!body.type ||
			!body.date
		) {
			return createError({
				statusCode: 400,
				message: "Bad Request",
				data: { message: "Request body must contain a transaction object." },
			})
		}
		const _currentMonth = dayjs(new Date()).format("YYYY-MM")
		let _budget = await db.query.MonthlyBudgetTable.findFirst({
			where: () =>
				and(
					eq(MonthlyBudgetTable.userId, userId),
					eq(MonthlyBudgetTable.groupId, body.groupId),
					eq(MonthlyBudgetTable.month, _currentMonth)
				),
		})

		// If no budget found for current month, grab the latest available one
		if (!_budget) {
			_budget = await db.query.MonthlyBudgetTable.findFirst({
				where: () =>
					and(
						eq(MonthlyBudgetTable.userId, userId),
						eq(MonthlyBudgetTable.groupId, body.groupId)
					),
				orderBy: (fields) => [desc(fields.month)],
			})
		}

		const _account = await db.query.AccountTable.findFirst({
			where: () => eq(AccountTable.id, body.accountId),
		})

		if (!_account) {
			return createError({
				statusCode: 400,
				message: "Bad Request",
				data: { message: "No account found with the specified accountId." },
			})
		}

		if (!_budget) {
			return createError({
				statusCode: 400,
				message: "Bad Request",
				data: { message: "No budget found for the specified category this month." },
			})
		}

		const _insertData = {
			userId: userId,
			title: body.title,
			category: body.category || "",
			groupId: body.groupId,
			budgetId: _budget.id,
			accountId: body.accountId,
			amount: parseFloat(body.amount)?.toFixed(2),
			type: body.type,
			memo: body.memo || "",
			date: body.date,
		}

		if (body.type === "EXPENSE") {
			const _newRemaining = (
				parseFloat(_budget?.remaining) - parseFloat(body.amount)
			).toFixed(2)

			await db
				.update(MonthlyBudgetTable)
				.set({
					remaining: _newRemaining,
					updatedAt: new Date(),
				})
				.where(eq(MonthlyBudgetTable.id, _budget.id))

			const _accRemaining = (parseFloat(_account.balance) - parseFloat(body.amount)).toFixed(
				2
			)

			await db
				.update(AccountTable)
				.set({
					balance: _accRemaining,
					updatedAt: new Date(),
				})
				.where(eq(AccountTable.id, body.accountId))

			await db.insert(TransactionTable).values(_insertData)
		}

		if (body.type === "INCOME") {
			const accRemainint = (parseFloat(_account.balance) + parseFloat(body.amount)).toFixed(2)

			await db
				.update(AccountTable)
				.set({
					balance: accRemainint,
					updatedAt: new Date(),
				})
				.where(eq(AccountTable.id, body.accountId))

			await db.insert(TransactionTable).values(_insertData)
		}

		return {
			statusCode: 200,
			message: "Manual transaction added successfully.",
		}
	} catch (error) {
		console.error("Error processing manual transaction:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
			data: { message: "An error occurred while processing the manual transaction." },
		})
	}
})

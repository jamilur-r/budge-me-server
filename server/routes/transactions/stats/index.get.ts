import dayjs from "dayjs"
import { and, eq, gte, lte } from "drizzle-orm"
import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { TransactionTable } from "server/utils/schema"

type TrendFlag = "up" | "down" | "neutral"

const getTrendFlag = (current: number, previous: number): TrendFlag => {
	if (current > previous) return "up"
	if (current < previous) return "down"
	return "neutral"
}

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user?.uid

		if (!userId) {
			return createError({
				statusCode: 401,
				message: "Unauthorized",
			})
		}

		const currentMonth = dayjs(new Date())
		const previousMonth = currentMonth.subtract(1, "month")

		// Get current month transactions
		const transactions = await db
			.select()
			.from(TransactionTable)
			.where(
				and(
					eq(TransactionTable.userId, userId),
					gte(TransactionTable.date, currentMonth.startOf("month").toDate()),
					lte(TransactionTable.date, currentMonth.endOf("month").toDate())
				)
			)

		// Get previous month transactions
		const previousTransactions = await db
			.select()
			.from(TransactionTable)
			.where(
				and(
					eq(TransactionTable.userId, userId),
					gte(TransactionTable.date, previousMonth.startOf("month").toDate()),
					lte(TransactionTable.date, previousMonth.endOf("month").toDate())
				)
			)

		// Calculate current month stats
		const totalIncome = transactions
			.filter(txn => txn.type === "INCOME")
			.reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount as any)), 0)

		const totalExpenses = transactions
			.filter(txn => txn.type === "EXPENSE")
			.reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount as any)), 0)

		// Calculate previous month stats
		const previousIncome = previousTransactions
			.filter(txn => txn.type === "INCOME")
			.reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount as any)), 0)

		const previousExpenses = previousTransactions
			.filter(txn => txn.type === "EXPENSE")
			.reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount as any)), 0)

		// Determine trend flags
		const incomeFlag = getTrendFlag(totalIncome, previousIncome)
		const expenseFlag = getTrendFlag(totalExpenses, previousExpenses)

		return {
			statusCode: 200,
			message: "Fetched transaction stats successfully",
			data: {
				totalIncome,
				totalExpenses,
				incomeFlag,
				expenseFlag,
				previousDayComparison: {
					previousIncome,
					previousExpenses,
					incomeDifference: totalIncome - previousIncome,
					expenseDifference: totalExpenses - previousExpenses,
				},
			},
		}
	} catch (error) {
		console.error("Error fetching transaction stats:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
		})
	}
})

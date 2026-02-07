import dayjs from "dayjs"
import { and, eq, gte, lte } from "drizzle-orm"
import { createError, eventHandler } from "h3"
import db from "server/utils/db"
import { CategoryGroupTable, MonthlyBudgetTable, TransactionTable } from "server/utils/schema"

type UsageStatus = "okay" | "warning" | "danger"

interface ChartBar {
	category: string
	categoryId: string
	budgetAmount: number
	spentAmount: number
	usagePercentage: number
	status: UsageStatus
}

interface ChartData {
	month: string
	bars: ChartBar[]
}

const getStatus = (percentage: number): UsageStatus => {
	if (percentage > 80) return "danger"
	if (percentage > 60) return "warning"
	return "okay"
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

		const month = dayjs(new Date()).format("YYYY-MM")
		const monthStart = dayjs(month).startOf("month").toDate()
		const monthEnd = dayjs(month).endOf("month").toDate()

		// Fetch budgets for the current month
		const budgets = await db
			.select({
				id: MonthlyBudgetTable.id,
				groupId: MonthlyBudgetTable.groupId,
				categoryName: CategoryGroupTable.name,
				assigned: MonthlyBudgetTable.assigned,
			})
			.from(MonthlyBudgetTable)
			.leftJoin(CategoryGroupTable, eq(MonthlyBudgetTable.groupId, CategoryGroupTable.id))
			.where(and(eq(MonthlyBudgetTable.userId, userId), eq(MonthlyBudgetTable.month, month)))

		// Fetch transactions for the current month (only EXPENSE type)
		const transactions = await db
			.select({
				budgetId: TransactionTable.budgetId,
				groupId: TransactionTable.groupId,
				amount: TransactionTable.amount,
			})
			.from(TransactionTable)
			.where(
				and(
					eq(TransactionTable.userId, userId),
					eq(TransactionTable.type, "EXPENSE"),
					gte(TransactionTable.date, monthStart),
					lte(TransactionTable.date, monthEnd)
				)
			)

		// Group transactions by groupId
		const transactionsByGroup = new Map<string, number>()
		transactions.forEach(transaction => {
			if (transaction.groupId) {
				const currentAmount = transactionsByGroup.get(transaction.groupId) || 0
				const amount = Math.abs(parseFloat(transaction.amount as any))
				transactionsByGroup.set(transaction.groupId, currentAmount + amount)
			}
		})

		// Build chart data
		const bars: ChartBar[] = budgets.map(budget => {
			const budgetAmount = parseFloat(budget.assigned as any) || 0
			const spentAmount = transactionsByGroup.get(budget.groupId || "") || 0
			const usagePercentage = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0
			const status = getStatus(usagePercentage)

			return {
				category: budget.categoryName || "Unknown",
				categoryId: budget.groupId || "",
				budgetAmount,
				spentAmount,
				usagePercentage: Math.round(usagePercentage * 100) / 100, // Round to 2 decimals
				status,
			}
		})

		const chartData: ChartData = {
			month,
			bars,
		}

		return {
			statusCode: 200,
			message: "Budget usage chart data fetched successfully",
			data: chartData,
		}
	} catch (error) {
		console.error("Error fetching budget usage charts:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
			data: { message: "An error occurred while fetching budget usage charts." },
		})
	}
})

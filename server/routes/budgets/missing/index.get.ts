import dayjs from "dayjs"
import { eq } from "drizzle-orm"
import { createError, eventHandler, getQuery } from "h3"
import db from "server/utils/db"
import { CategoryGroupTable, MonthlyBudgetTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user?.uid
		const queryParams = getQuery(event)
		const month = (queryParams.month as string) || dayjs().format("YYYY-MM")

		if (!userId) {
			return createError({
				statusCode: 401,
				message: "Unauthorized",
			})
		}

		// Get all category groups
		const allCategories = await db
			.select()
			.from(CategoryGroupTable)
			.orderBy(CategoryGroupTable.order)

		// Get all budgets for the user in the specified month
		const userBudgets = await db
			.select()
			.from(MonthlyBudgetTable)
			.where(eq(MonthlyBudgetTable.userId, userId) && eq(MonthlyBudgetTable.month, month))

		// Get the IDs of categories that have budgets
		const categoriesWithBudgets = new Set(userBudgets.map(budget => budget.groupId?.toString()))

		// Find categories without budgets
		const missingBudgetCategories = allCategories.filter(
			category => !categoriesWithBudgets.has(category.id)
		)

		return {
			statusCode: 200,
			message: "Fetched missing budget categories successfully",
			data: {
				month,
				missingCategories: missingBudgetCategories,
				totalCategories: allCategories.length,
				categoriesWithBudgets: userBudgets.length,
				missingCount: missingBudgetCategories.length,
			},
		}
	} catch (error) {
		console.error("Error fetching missing budgets:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
		})
	}
})

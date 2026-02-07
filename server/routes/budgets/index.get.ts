import dayjs from "dayjs"
import { and, eq } from "drizzle-orm"
import { createError, eventHandler, getQuery } from "h3"
import db from "server/utils/db"
import { CategoryGroupTable, MonthlyBudgetTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user.uid
		const queryParams = getQuery(event)

		const month = (queryParams.month as string) || dayjs(new Date()).format("YYYY-MM")

		const budgets = await db
			.select({
				id: MonthlyBudgetTable.id,
				userId: MonthlyBudgetTable.userId,
				groupId: MonthlyBudgetTable.groupId,
				month: MonthlyBudgetTable.month,
				assigned: MonthlyBudgetTable.assigned,
				remaining: MonthlyBudgetTable.remaining,
				updatedAt: MonthlyBudgetTable.updatedAt,
				categoryName: CategoryGroupTable.name,
			})
			.from(MonthlyBudgetTable)
			.leftJoin(CategoryGroupTable, eq(MonthlyBudgetTable.groupId, CategoryGroupTable.id))
			.where(and(eq(MonthlyBudgetTable.userId, userId), eq(MonthlyBudgetTable.month, month)))

		return {
			statusCode: 200,
			message: "Budgets fetched successfully.",
			data: { budgets },
		}
	} catch (error) {
		console.log(error)
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			data: { message: "An error occurred while fetching budgets." },
		})
	}
})

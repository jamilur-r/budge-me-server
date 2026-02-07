import dayjs from "dayjs"
import { and, eq } from "drizzle-orm"
import { createError, eventHandler, readBody } from "h3"
import db from "server/utils/db"
import { CategoryGroupTable, MonthlyBudgetTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user.uid
		const body = await readBody(event)
		const budgets = body.budgets

		if (!budgets || !Array.isArray(budgets)) {
			return createError({
				statusCode: 400,
				statusMessage: "Bad Request",
				data: { message: "Invalid budgets data." },
			})
		}

		const categories = await db.select().from(CategoryGroupTable)

		const budgetsToInsert: {
			userId: string
			groupId: string
			month: string
			assigned: string
		}[] = []

		categories.map(category => {
			const matchingBudget = budgets.filter((b: any) => b.groupId === category.id)

			if (matchingBudget.length > 0) {
				const totalAssigned = matchingBudget.reduce(
					(sum: number, b: any) => sum + parseFloat(b.assigned),
					0
				)

				const data = {
					userId: userId,
					groupId: category.id,
					month: body.month || dayjs(new Date()).format("YYYY-MM"),
					assigned: totalAssigned.toFixed(2),
				}
				budgetsToInsert.push(data)
			}
		})
		await db.transaction(async tx => {
			for (const budgetData of budgetsToInsert) {
				const existingBudget = await tx
					.select()
					.from(MonthlyBudgetTable)
					.where(
						and(
							eq(MonthlyBudgetTable.userId, budgetData.userId),
							eq(MonthlyBudgetTable.groupId, budgetData.groupId),
							eq(MonthlyBudgetTable.month, budgetData.month)
						)
					)
					.limit(1)

				if (existingBudget.length > 0) {
					await tx
						.update(MonthlyBudgetTable)
						.set({ assigned: budgetData.assigned, updatedAt: new Date() })
						.where(eq(MonthlyBudgetTable.id, existingBudget[0].id))
				} else {
					await tx.insert(MonthlyBudgetTable).values(budgetData)
				}
			}
		})

		const createdBudgets = await db
			.select()
			.from(MonthlyBudgetTable)
			.where(and(eq(MonthlyBudgetTable.userId, userId)))
		return {
			statusCode: 200,
			message: "Budgets processed successfully.",
			data: { budgets: createdBudgets },
		}
	} catch (error) {
		console.error("Error handling POST /budgets:", error)
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
			data: { message: "An error occurred while processing your request." },
		})
	}
})

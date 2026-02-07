import { eq } from "drizzle-orm"
import { createError, eventHandler, getQuery } from "h3"
import CreateAccountPrompt from "server/prompts/create-account"
import CreateBudgetsPrompt from "server/prompts/create-budgets"
import CreateTransactionPrompt from "server/prompts/create-transaction"
import {
	CREATE_ACCOUNT_PROMPT_ID,
	CREATE_BUDGETS_PROMPT_ID,
	CREATE_TRANSACTION_PROMPT_ID,
} from "server/prompts/ids"
import db from "server/utils/db"
import { AccountTable, CategoryGroupTable, MonthlyBudgetTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	const query = getQuery(event)
	const userId = event.context.user.uid

	if (!query.promptId || query?.promptId === "") {
		return createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			data: {
				message: "promptId query parameter is required.",
			},
		})
	}

	const promptId = query.promptId as string

	if (promptId === CREATE_ACCOUNT_PROMPT_ID) {
		return {
			statusCode: 200,
			message: "Create Account Prompt fetched successfully",
			data: {
				prompt: CreateAccountPrompt,
			},
		}
	} else if (promptId == CREATE_BUDGETS_PROMPT_ID) {
		const categories = await db.select().from(CategoryGroupTable)

		const items = categories.map(category => ({
			name: category.name,
			description: category.description,
			id: category.id,
			order: category.order,
		}))

		const accounts = await db.query.AccountTable.findMany({
			where: () => eq(AccountTable.userId, userId),
		})

		const TBB = accounts.reduce((total, acc) => total + parseFloat(acc.balance), 0)

		const PROMPT = CreateBudgetsPrompt.replace(
			"{{CATEGORY_GROUPS_LIST}}",
			JSON.stringify(items)
		).replace("{{TBB_AMOUNT}}", TBB.toString())

		return {
			statusCode: 200,
			message: "Create Budgets Prompt fetched successfully",
			data: {
				prompt: PROMPT,
			},
		}
	} else if (promptId === CREATE_TRANSACTION_PROMPT_ID) {
		const categories = await db.select().from(CategoryGroupTable)
		const budgets = await db
			.select()
			.from(MonthlyBudgetTable)
			.where(eq(MonthlyBudgetTable.userId, userId))
		const accounts = await db.select().from(AccountTable).where(eq(AccountTable.userId, userId))

		const PROMPT = CreateTransactionPrompt.replace(
			"{{CATEGORIES_JSON}}",
			JSON.stringify(categories)
		)
			.replace("{{BUDGETS_JSON}}", JSON.stringify(budgets))
			.replace("{{ACCOUNTS_JSON}}", JSON.stringify(accounts))

		return {
			statusCode: 200,
			message: "Create Transaction Prompt fetched successfully",
			data: {
				prompt: PROMPT,
			},
		}
	} else {
		return createError({
			statusCode: 404,
			statusMessage: "Not Found",
			data: {
				message: `Prompt with id ${promptId} not found.`,
			},
		})
	}
})

import dayjs from "dayjs"
import { and, count, desc, eq, gte, lte } from "drizzle-orm"
import { createError, eventHandler, getQuery } from "h3"
import db from "server/utils/db"
import { TransactionTable } from "server/utils/schema"

export default eventHandler(async (event): Promise<ResponseReturnType> => {
	try {
		const userId = event.context.user?.uid

		const queryParams = getQuery(event)
		const page = parseInt((queryParams.page as string) || "1", 10)
		const pageSize = parseInt((queryParams.pageSize as string) || "20", 10)
		const month = queryParams.month as string | undefined
		const startDate = queryParams.startDate as string | undefined
		const endDate = queryParams.endDate as string | undefined

		const limit = pageSize > 0 ? pageSize : 20
		const offset = page > 1 ? (page - 1) * limit : 0

		if (!userId) {
			return createError({
				statusCode: 401,
				message: "Unauthorized",
			})
		}

		// Build where conditions
		const whereConditions: any[] = [eq(TransactionTable.userId, userId)]

		// Add month filter if provided
		if (month) {
			const monthStart = dayjs(month).startOf("month").toDate()
			const monthEnd = dayjs(month).endOf("month").toDate()
			whereConditions.push(gte(TransactionTable.date, monthStart))
			whereConditions.push(lte(TransactionTable.date, monthEnd))
		}

		// Add date range filter if provided
		if (startDate && endDate) {
			const start = dayjs(startDate).startOf("day").toDate()
			const end = dayjs(endDate).endOf("day").toDate()
			whereConditions.push(gte(TransactionTable.date, start))
			whereConditions.push(lte(TransactionTable.date, end))
		} else if (startDate) {
			// Filter by single start date
			const start = dayjs(startDate).startOf("day").toDate()
			const end = dayjs(startDate).endOf("day").toDate()
			whereConditions.push(gte(TransactionTable.date, start))
			whereConditions.push(lte(TransactionTable.date, end))
		} else if (endDate) {
			// Filter by single end date
			const start = dayjs(endDate).startOf("day").toDate()
			const end = dayjs(endDate).endOf("day").toDate()
			whereConditions.push(gte(TransactionTable.date, start))
			whereConditions.push(lte(TransactionTable.date, end))
		}

		const whereClause =
			whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0]

		const transactions = await db
			.select()
			.from(TransactionTable)
			.where(whereClause)
			.limit(limit)
			.offset(offset)
			.orderBy(desc(TransactionTable.date))

		const totalCountResult = await db
			.select({ value: count() })
			.from(TransactionTable)
			.where(whereClause)

		const totalTransactions = totalCountResult[0]?.value ?? 0

		const totalPage = Math.ceil(totalTransactions / limit)

		return {
			statusCode: 200,
			message: "Fetched transactions successfully",
			data: {
				transactions,
				page,
				totalPage,
				pageSize: limit,
				totalTransactions,
			},
		}
	} catch (error) {
		console.error("Error fetching transactions:", error)
		return createError({
			statusCode: 500,
			message: "Internal Server Error",
		})
	}
})

import { relations } from "drizzle-orm"
import {
	boolean,
	char,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core"

export const CarouselTable = pgTable("carousels", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	subText: text("sub_text").notNull(),
	imageUrl: text("image_url"),
})

export const UserProfileTable = pgTable("user_profiles", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull().unique(),
	isAccountSetupComplete: boolean("is_account_setup_complete").notNull().default(false),
	isNextMonthBudgetReady: boolean("is_next_month_budget_ready").notNull().default(false),
})

export const AccoutType = pgEnum("account_type", ["BANK", "WALLET", "CREDIT_CARD", "CASH"])

export const AccountTable = pgTable("accounts", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	accountType: AccoutType("account_type").notNull(),
	name: char("name", { length: 60 }).notNull(),
	balance: numeric("balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
	currency: char("currency", { length: 3 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const CategoryGroupTable = pgTable("category_groups", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	description: text("description"),
	order: integer("order").notNull().default(0),
})

export const MonthlyBudgetTable = pgTable("monthly_budgets", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "cascade" }),
	month: text("month").notNull(), // Format: "YYYY-MM"
	assigned: numeric("assigned", { precision: 15, scale: 2 }).notNull().default("0.00"),
	remaining: numeric("remaining", { precision: 15, scale: 2 }).notNull().default("0.00"),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const TransactionType = pgEnum("transaction_type", ["INCOME", "EXPENSE", "TRANSFER"])

export const TransactionTable = pgTable("transactions", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "set null" }),
	budgetId: uuid("budget_id").references(() => MonthlyBudgetTable.id, { onDelete: "set null" }),
	title: char("title", { length: 90 }).notNull(),
	category: text("category").notNull(),
	accountId: uuid("account_id").notNull(),
	amount: numeric("amount", { precision: 15, scale: 2 }).notNull(), // Negative for spending
	date: timestamp("date").notNull().defaultNow(),
	type: TransactionType("type").notNull(),
	memo: text("memo"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const CategoryRelations = relations(CategoryGroupTable, ({ one, many }) => ({
	group: one(CategoryGroupTable, {
		fields: [CategoryGroupTable.id],
		references: [CategoryGroupTable.id],
	}),
	budgets: many(MonthlyBudgetTable),
	transactions: many(TransactionTable),
}))

export const MonthlyBudgetRelations = relations(MonthlyBudgetTable, ({ one }) => ({
	category: one(CategoryGroupTable, {
		fields: [MonthlyBudgetTable.groupId],
		references: [CategoryGroupTable.id],
	}),
}))

export const TransactionRelations = relations(TransactionTable, ({ one }) => ({
	category: one(CategoryGroupTable, {
		fields: [TransactionTable.groupId],
		references: [CategoryGroupTable.id],
	}),
}))

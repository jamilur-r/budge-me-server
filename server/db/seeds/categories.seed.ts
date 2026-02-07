import db from "server/utils/db"
import { CategoryGroupTable } from "server/utils/schema"

async function seed() {
	console.log("🌱 Seeding Admin Category Groups...")

	const groups = [
		{
			name: "Fixed Bills",
			description: "Non-negotiable monthly expenses like rent, utilities, and insurance.",
			order: 1,
		},
		{
			name: "Living Expenses",
			description: "Variable daily needs like groceries, fuel, and household supplies.",
			order: 2,
		},
		{
			name: "Transport & Auto",
			description: "Fuel, public transit, car maintenance, and registration.",
			order: 3,
		},
		{
			name: "Health & Wellness",
			description: "Medical expenses, pharmacy, dental, and fitness.",
			order: 4,
		},
		{
			name: "Education & Growth",
			description: "Tuition, books, certifications, and personal development.",
			order: 5,
		},
		{
			name: "Lifestyle & Outing",
			description: "Discretionary spending for dining out, hobbies, and entertainment.",
			order: 6,
		},
		{
			name: "Shopping",
			description: "Clothing, electronics, and personal items.",
			order: 7,
		},
		{
			name: "Financial Goals",
			description: "Savings, debt repayment, and emergency funds.",
			order: 8,
		},
		{
			name: "Giving & Gifts",
			description: "Charitable donations and seasonal gift-giving.",
			order: 9,
		},
		{
			name: "Subscriptions",
			description: "Digital services like Netflix, Spotify, or Gym memberships.",
			order: 10,
		},
		{
			name: "Unexpected / Misc",
			description: "Small things that don't fit elsewhere or forgotten expenses.",
			order: 11,
		},
	]

	try {
		for (const group of groups) {
			await db.insert(CategoryGroupTable).values(group).onConflictDoNothing()
		}
		console.log("✅ Seeding complete!")
	} catch (error) {
		console.error("❌ Seeding failed:", error)
		process.exit(1)
	}
}

seed()

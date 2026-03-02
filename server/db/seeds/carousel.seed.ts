/**
 * Carousel Seed Script
 * Populates the database with sample carousel data
 * Run with: npx tsx server/db/seeds/carousel.seed.ts
 */

import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { CarouselTable } from "server/utils/schema"

async function seedCarousel() {
	console.log("🎠 Seeding carousel data...\n")

	const databaseUrl = process.env.DATABASE_URL
	if (!databaseUrl) {
		throw new Error("DATABASE_URL is not set in .env")
	}

	try {
		// Create connection
		const client = postgres(databaseUrl)

		const db = drizzle(client)

		// Sample carousel data
		const carouselData = [
			{
				title: "Your Money, But Smarter",
				subText: "Our AI watches your spending so you don’t have to (no judgment… mostly).",
				imageUrl:
					"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
			},
			{
				title: "Budgets That Actually Work",
				subText: "AI-built budgets based on how you really spend — not how you pretend to.",
				imageUrl:
					"https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&h=400&fit=crop",
			},
			{
				title: "AI That Calls You Out",
				subText: "‘Another food delivery?’ Yes. The AI noticed. And remembers.",
				imageUrl:
					"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
			},
			{
				title: "Insights, Not Spreadsheets",
				subText: "Clear trends, smart predictions, and zero Excel-induced trauma.",
				imageUrl:
					"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
			},
			{
				title: "Privacy Comes First. Always.",
				subText: "Your financial data stays locked down. Even our AI can’t gossip.",
				imageUrl:
					"https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop",
			},
		]
		// Clear existing data
		console.log("Clearing existing carousel data...")
		await db.delete(CarouselTable)
		console.log("✓ Cleared existing data")

		// Insert new data
		console.log("\nInserting carousel slides...")
		for (const slide of carouselData) {
			await db.insert(CarouselTable).values(slide)
			console.log(`✓ Added: ${slide.title}`)
		}

		console.log(`\n${"=".repeat(50)}`)
		console.log("✅ Carousel seed completed successfully!")
		console.log("=".repeat(50))

		await client.end()
		process.exit(0)
	} catch (error) {
		console.error("\n❌ Seeding failed:")
		console.error(error)
		process.exit(1)
	}
}

seedCarousel()

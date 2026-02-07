/**
 * Database Connection Test
 * Tests Drizzle ORM connection to PostgreSQL
 * Run with: npx tsx server/tests/db-test.ts
 */

import "dotenv/config"
import postgres from "postgres"

async function testDatabaseConnection() {
	console.log("🗄️  Testing Database Connection with PostgreSQL...\n")

	let client: any

	try {
		console.log("Connecting to PostgreSQL...")

		const dbHost = process.env.DB_HOST
		const dbUser = process.env.DB_USER
		const dbPassword = process.env.DB_PASSWORD
		const dbName = process.env.DB_NAME

		if (!dbHost || !dbUser || !dbPassword || !dbName) {
			throw new Error(
				"Database configuration is incomplete. Set DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME."
			)
		}

		client = postgres({
			host: dbHost,
			port: 5432,
			user: dbUser,
			password: dbPassword,
			database: dbName,
		})

		console.log("✅ Postgres client created")

		// Test basic query execution
		console.log("\n⏳ Testing query execution...")

		const result = await client`SELECT NOW() as current_time, version() as db_version`

		if (result && result.length > 0) {
			const row = result[0] as any
			console.log("✅ Query executed successfully!")
			console.log(`   Current Time: ${row.current_time}`)
			console.log(`   PostgreSQL Version: ${row.db_version?.substring(0, 50)}...`)
		}

		console.log("\n" + "=".repeat(50))
		console.log("✅ Database connection test PASSED!")
		console.log("=".repeat(50))
		console.log("\nYou can now:")
		console.log("1. Define your data models using Drizzle schema")
		console.log("2. Use the database instance in server/utils/db.ts")
		console.log("3. Run migrations using drizzle-kit")

		await client.end()
		return true
	} catch (error: any) {
		console.error("\n" + "=".repeat(50))
		console.error("❌ Database connection test FAILED!")
		console.error("=".repeat(50))
		console.error("\nError:", error.message)

		if (error.code === "ECONNREFUSED") {
			console.error(
				"\n📍 Connection refused - PostgreSQL may not be running on localhost:5432"
			)
			console.error("   To fix this:")
			console.error("   1. Make sure PostgreSQL is installed and running")
			console.error("   2. Verify DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in .env")
			console.error("   3. Ensure the database 'budget_me' exists")
		} else if (error.code === "28P01") {
			console.error("\n📍 Authentication failed - invalid credentials")
			console.error("   Check your DB_USER and DB_PASSWORD in .env")
		} else if (error.code === "3D000") {
			console.error("\n📍 Database does not exist")
			console.error("   Create the database with:")
			console.error("   createdb -U devuser budget_me (on command line)")
		}

		if (client) {
			await client.end()
		}
		return false
	}
}

testDatabaseConnection().then(success => {
	process.exit(success ? 0 : 1)
})

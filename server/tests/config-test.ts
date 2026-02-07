/**
 * Test script to validate Firebase and database configurations
 * Run with: npx ts-node server/tests/config-test.ts
 */

import "dotenv/config"

async function testFirebaseConfig() {
	console.log("🔥 Testing Firebase Configuration...\n")

	try {
		const serviceAccountKeyStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

		if (!serviceAccountKeyStr) {
			console.error("❌ FIREBASE_SERVICE_ACCOUNT_KEY is not set")
			return false
		}

		let serviceAccount: any
		try {
			serviceAccount = JSON.parse(serviceAccountKeyStr)
		} catch (error) {
			console.error("❌ FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON")
			return false
		}

		// Validate required Firebase service account fields
		const requiredFields = ["type", "project_id", "private_key", "client_email"]
		const missingFields = requiredFields.filter(field => !serviceAccount[field])

		if (missingFields.length > 0) {
			console.error(`❌ Missing Firebase fields: ${missingFields.join(", ")}`)
			return false
		}

		console.log("✅ FIREBASE_SERVICE_ACCOUNT_KEY is valid")
		console.log(`   Project ID: ${serviceAccount.project_id}`)
		console.log(`   Service Account Email: ${serviceAccount.client_email}`)

		// Try to initialize Firebase Admin SDK
		try {
			const admin = await import("firebase-admin")
			const firebaseApp = admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
			})
			console.log("✅ Firebase Admin SDK initialized successfully")
			return true
		} catch (error) {
			console.error("❌ Failed to initialize Firebase Admin SDK:", error)
			return false
		}
	} catch (error) {
		console.error("❌ Firebase configuration test failed:", error)
		return false
	}
}

function testDatabaseConfig() {
	console.log("\n📦 Testing Database Configuration...\n")

	const dbHost = process.env.DB_HOST
	const dbUser = process.env.DB_USER
	const dbPassword = process.env.DB_PASSWORD
	const dbName = process.env.DB_NAME

	if (!dbHost || !dbUser || !dbPassword || !dbName) {
		const missing = []
		if (!dbHost) missing.push("DB_HOST")
		if (!dbUser) missing.push("DB_USER")
		if (!dbPassword) missing.push("DB_PASSWORD")
		if (!dbName) missing.push("DB_NAME")
		console.warn(`⚠️  Missing database config: ${missing.join(", ")}`)
		return true // Not critical, can be configured later
	}

	console.log("✅ Database configuration found:")
	console.log(`   Host: ${dbHost}`)
	console.log(`   User: ${dbUser}`)
	console.log(`   Database: ${dbName}`)
	console.log("\n📝 Note: Install your database driver (e.g., mysql2, pg, better-sqlite3)")
	console.log("   and configure drizzle-orm in server/utils/db.ts")

	return true
}

function testApiTokens() {
	console.log("\n🔐 Testing API Token Configuration...\n")

	const apiTokens = process.env.API_TOKENS

	if (!apiTokens) {
		console.error("❌ API_TOKENS is not set")
		return false
	}

	const tokens = apiTokens.split(",").filter(t => t.trim())

	if (tokens.length === 0) {
		console.error("❌ API_TOKENS is empty or invalid")
		return false
	}

	console.log(`✅ API_TOKENS configured with ${tokens.length} token(s):`)
	tokens.forEach((token, i) => {
		const display = token.length > 10 ? token.substring(0, 10) + "..." : token
		console.log(`   ${i + 1}. ${display}`)
	})

	return true
}

async function runTests() {
	console.log("=".repeat(50))
	console.log("   Configuration Test Suite")
	console.log("=".repeat(50) + "\n")

	const results = {
		firebase: await testFirebaseConfig(),
		database: testDatabaseConfig(),
		apiTokens: testApiTokens(),
	}

	console.log("\n" + "=".repeat(50))
	console.log("   Test Results")
	console.log("=".repeat(50))
	console.log(`Firebase:   ${results.firebase ? "✅ PASS" : "❌ FAIL"}`)
	console.log(`Database:   ${results.database ? "✅ PASS" : "⚠️  WARNING"}`)
	console.log(`API Tokens: ${results.apiTokens ? "✅ PASS" : "❌ FAIL"}`)
	console.log("=".repeat(50) + "\n")

	const allPassed = results.firebase && results.apiTokens
	if (allPassed) {
		console.log("✅ All critical configurations are valid!")
		console.log("You can now run the server with: yarn dev")
	} else {
		console.log("❌ Some configurations failed. Please check above.")
	}
}

runTests().catch(console.error)

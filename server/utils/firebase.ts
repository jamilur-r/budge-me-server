import { App, applicationDefault, cert, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getDatabase } from "firebase-admin/database"

let firebaseApp: App

function initializeFirebase() {
	if (firebaseApp) {
		return firebaseApp
	}

	firebaseApp = initializeApp({
		credential: cert({
			projectId: process.env.FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY
				? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
				: undefined,
		}),
	})

	return firebaseApp
}

export function getFirebaseAuth() {
	if (!firebaseApp) {
		initializeFirebase()
	}
	return getAuth(firebaseApp)
}

export function getFirebaseDb() {
	if (!firebaseApp) {
		initializeFirebase()
	}
	return getDatabase(firebaseApp)
}

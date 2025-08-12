import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id"
}

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn(
    "[Firebase] Using placeholder credentials – set NEXT_PUBLIC_FIREBASE_* environment variables to connect to your own project."
  )
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export type User = {
  id: string
  name: string
  email: string
  role: "student" | "admin"
  created_at: string
}

export type Notification = {
  id: string
  title: string
  body: string
  timestamp: string
  created_by: string
}

export type Analytics = {
  id: string
  date: string
  views: number
  unique_users: number
} 
// Migration script to transfer data from Supabase to Firebase
// This is a helper script - you'll need to customize it based on your data structure

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data structure - replace with your actual Supabase data
const sampleData = {
  users: [
    {
      name: "John Doe",
      email: "john@student.edu",
      role: "student",
      created_at: new Date().toISOString()
    },
    {
      name: "Admin User",
      email: "admin@college.edu", 
      role: "admin",
      created_at: new Date().toISOString()
    }
  ],
  analytics: [
    {
      date: new Date().toISOString(),
      views: 45,
      unique_users: 12
    }
  ],
  notifications: [
    {
      title: "Welcome to EduTracker",
      body: "Your student dashboard is now ready!",
      timestamp: new Date().toISOString(),
      created_by: "admin"
    }
  ]
};

async function migrateData() {
  console.log('Starting data migration to Firebase...');
  
  try {
    // Migrate users
    console.log('Migrating users...');
    for (const user of sampleData.users) {
      await addDoc(collection(db, 'users'), user);
      console.log(`Migrated user: ${user.email}`);
    }
    
    // Migrate analytics
    console.log('Migrating analytics...');
    for (const analytic of sampleData.analytics) {
      await addDoc(collection(db, 'analytics'), analytic);
      console.log(`Migrated analytics for: ${analytic.date}`);
    }
    
    // Migrate notifications
    console.log('Migrating notifications...');
    for (const notification of sampleData.notifications) {
      await addDoc(collection(db, 'notifications'), notification);
      console.log(`Migrated notification: ${notification.title}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData }; 
# Firebase Setup Guide

This project has been migrated from Supabase to Firebase. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "student-dashboard")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## 3. Set up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database
5. Click "Done"

## 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>)
4. Register your app with a nickname
5. Copy the configuration object

## 5. Set Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase configuration.

## 6. Set up Firestore Security Rules

In the Firestore Database section, go to "Rules" and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read analytics and notifications
    match /analytics/{document} {
      allow read: if request.auth != null;
    }
    
    match /notifications/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 7. Install Dependencies

The Firebase SDK has already been installed. If you need to reinstall:

```bash
npm install firebase
```

## 8. Test the Application

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Try signing up and signing in
4. Test the admin functionality

## Migration Notes

- User authentication now uses Firebase Auth
- Database operations use Firestore instead of Supabase
- User roles are stored in Firestore documents
- The API structure remains similar for easy migration

## Troubleshooting

- Make sure all environment variables are set correctly
- Check Firebase console for any authentication errors
- Verify Firestore rules allow the operations you're trying to perform
- Check browser console for any Firebase-related errors 
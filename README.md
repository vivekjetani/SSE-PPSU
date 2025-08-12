# Student Dashboard

A modern student dashboard built with Next.js, TypeScript, and Firebase.

## Features

- 🔐 **Authentication**: Firebase Authentication with email/password
- 📊 **Dashboard**: Student overview with analytics and notifications
- 👨‍💼 **Admin Panel**: User management and notification system
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI components

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Firebase (Authentication, Firestore)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Create a `.env.local` file with your Firebase configuration

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Project Structure

```
student-dashboard/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Student dashboard
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
│   ├── auth.ts           # Firebase authentication
│   ├── database.ts       # Firestore operations
│   └── firebase.ts       # Firebase configuration
├── scripts/              # Migration and setup scripts
└── public/               # Static assets
```

## Firebase Migration

This project was migrated from Supabase to Firebase. Key changes:

- **Authentication**: Now uses Firebase Auth instead of Supabase Auth
- **Database**: Uses Firestore instead of Supabase PostgreSQL
- **User Management**: User roles stored in Firestore documents
- **API Structure**: Maintained similar interface for easy migration

For detailed migration instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. # SSE-PPSU

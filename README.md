<div align="center">

# 🎬 Filmora

### A Modern Movie Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## � Screenshot

<div align="center">
  <img src="preview.png" alt="Filmora Screenshot" width="800"/>
</div>

---

## �📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Setup](#️-environment-setup)
- [🗄️ Database Setup](#️-database-setup)
- [📦 Installation](#-installation)
- [🎮 Demo Credentials](#-demo-credentials)
- [🏗️ Project Structure](#️-project-structure)
- [📜 Available Scripts](#-available-scripts)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

- 🎥 **Movie Management** - Create, read, update, and delete movie entries
- 🔍 **OMDB Integration** - Search and import movie data from OMDB API
- 🖼️ **Image Upload** - Upload and manage movie posters with ImageKit
- 🎨 **Theming** - Dark/Light mode with customizable accent colors
- 🔐 **Authentication** - Secure user authentication with Clerk
- 🤖 **AI-Powered** - Gemini API integration for intelligent features
- 📱 **Responsive Design** - Beautiful UI built with shadcn/ui components
- ⚡ **Real-time Updates** - React Query for efficient data fetching
- 🎯 **Type Safety** - Full TypeScript support with Zod validation

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="48" height="48" alt="Next.js" />
      <br>Next.js
    </td>
    <td align="center" width="96">
      <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="48" height="48" alt="Tailwind" />
      <br>Tailwind CSS
    </td>
    <td align="center" width="96">
      <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="48" height="48" alt="shadcn/ui" />
      <br>shadcn/ui
    </td>
    <td align="center" width="96">
      <img src="https://avatars.githubusercontent.com/u/97491483?s=200&v=4" width="48" height="48" alt="Clerk" />
      <br>Clerk
    </td>
    <td align="center" width="96">
      <img src="https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg" width="48" height="48" alt="Gemini" />
      <br>Gemini API
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="48" height="48" alt="Node.js" />
      <br>Node.js
    </td>
    <td align="center" width="96">
      <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" width="48" height="48" alt="Express" />
      <br>Express
    </td>
    <td align="center" width="96">
      <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" width="48" height="48" alt="Prisma" />
      <br>Prisma
    </td>
    <td align="center" width="96">
      <img src="https://cdn.worldvectorlogo.com/logos/postgresql.svg" width="48" height="48" alt="PostgreSQL" />
      <br>Neon DB
    </td>
    <td align="center" width="96">
      <img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="48" height="48" alt="Zod" />
      <br>Zod
    </td>
  </tr>
</table>

### Deployment & APIs

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://cdn.worldvectorlogo.com/logos/vercel.svg" width="48" height="48" alt="Vercel" />
      <br>Vercel
    </td>
    <td align="center" width="96">
      <img src="https://avatars.githubusercontent.com/u/5542226?s=200&v=4" width="48" height="48" alt="Render" />
      <br>Render.io
    </td>
    <td align="center" width="96">
      <img src="https://www.omdbapi.com/favicon.ico" width="48" height="48" alt="OMDB" />
      <br>OMDB API
    </td>
  </tr>
</table>

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL Database** (or Neon account) - [Sign up for Neon](https://neon.tech/)

---

## ⚙️ Environment Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/cbeAbishek/Filmora.git
cd Filmora
```

### 2️⃣ Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following environment variables:

```env
# Server Configuration
NODE_ENV=development
PORT=4000

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@your-neon-host/database?sslmode=require

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
CLERK_JWT_TEMPLATE_NAME=your_jwt_template_name

# OMDB API
OMDB_API_KEY=your_omdb_api_key
OMDB_BASE_URL=https://www.omdbapi.com

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,https://your-frontend-domain.vercel.app

# Logging
LOG_LEVEL=info
```

**Quick Setup Command:**

```bash
cat > .env << 'EOF'
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://username:password@your-neon-host/database?sslmode=require
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
CLERK_JWT_TEMPLATE_NAME=your_jwt_template_name
OMDB_API_KEY=your_omdb_api_key
OMDB_BASE_URL=https://www.omdbapi.com
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
EOF
```

### 3️⃣ Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cd ../frontend
touch .env.local
```

Add the following environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
NEXT_PUBLIC_CLERK_JWT_TEMPLATE=your_jwt_template_name

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:4000

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Gemini AI (Optional)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

**Quick Setup Command:**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
NEXT_PUBLIC_CLERK_JWT_TEMPLATE=your_jwt_template_name
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
EOF
```

---

## 🗄️ Database Setup

### Database Schema

Filmora uses **Prisma** ORM with **Neon PostgreSQL** database. The schema includes:

#### 📊 Models

**Movie Model**
```prisma
model Movie {
  id           String   @id @default(cuid())
  userId       String
  title        String
  director     String
  budget       Decimal?
  location     String
  duration     Int
  releaseYear  Int?
  releaseDate  DateTime?
  description  String?
  posterUrl    String?
  omdbId       String?  @unique
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**UserPreference Model**
```prisma
model UserPreference {
  id          String   @id @default(cuid())
  userId      String   @unique
  theme       String   @default("light")
  accentColor String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 🔧 Running Migrations

Navigate to the backend directory and run:

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

### 📝 Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (⚠️ Warning: This will delete all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status
```

---

## 📦 Installation

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

The backend will be running at `http://localhost:4000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

### 🐳 Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## 🎮 Demo Credentials

Try out Filmora with our demo account:

```
📧 Email: demo@demo.com
🔑 Password: 2025@Demo
```

> **Note:** The demo account has pre-populated data to showcase all features. Feel free to explore and test the application!

---

## 🏗️ Project Structure

```
Filmora/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── clerk.ts       # Clerk authentication config
│   │   │   ├── env.ts         # Environment variables validation
│   │   │   ├── imagekit.ts    # ImageKit config
│   │   │   └── prisma.ts      # Prisma client setup
│   │   ├── controllers/       # Request handlers
│   │   │   ├── imagekit.controller.ts
│   │   │   ├── movie.controller.ts
│   │   │   ├── omdb.controller.ts
│   │   │   └── preference.controller.ts
│   │   ├── middleware/        # Express middlewares
│   │   │   ├── error-handler.ts
│   │   │   ├── not-found.ts
│   │   │   ├── require-auth.ts
│   │   │   └── validate.ts
│   │   ├── repositories/      # Database access layer
│   │   │   └── movie.repository.ts
│   │   ├── routes/           # API routes
│   │   │   ├── health.routes.ts
│   │   │   ├── imagekit.routes.ts
│   │   │   ├── movie.routes.ts
│   │   │   └── preference.routes.ts
│   │   ├── schemas/          # Zod validation schemas
│   │   │   └── movie.schema.ts
│   │   ├── services/         # Business logic
│   │   │   ├── movie.service.ts
│   │   │   ├── omdb.service.ts
│   │   │   └── preference.service.ts
│   │   ├── utils/            # Utility functions
│   │   │   ├── async-handler.ts
│   │   │   ├── auth-context.ts
│   │   │   └── http-error.ts
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Server entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                  # Next.js frontend
│   ├── app/                  # Next.js 13+ app directory
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── dashboard/       # Protected dashboard
│   │   │   ├── preferences/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── landing/        # Landing page components
│   │   └── providers/      # Context providers
│   ├── hooks/              # Custom React hooks
│   │   ├── use-debounce.ts
│   │   ├── use-infinite-movies.ts
│   │   ├── use-movie-mutations.ts
│   │   ├── use-omdb-search.ts
│   │   └── use-preferences.ts
│   ├── lib/                # Utility libraries
│   │   ├── api-client.ts
│   │   ├── env.ts
│   │   ├── gemini.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── validation.ts
│   ├── public/             # Static assets
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```

---

## 📜 Available Scripts

### Backend Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Frontend Scripts

```bash
npm run dev        # Start Next.js development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Database Scripts

```bash
npx prisma generate          # Generate Prisma Client
npx prisma migrate dev       # Run migrations in development
npx prisma migrate deploy    # Deploy migrations to production
npx prisma studio           # Open Prisma Studio GUI
npx prisma db push          # Push schema changes without migrations
npx prisma db seed          # Seed the database
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and import your repository
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
cd frontend
vercel --prod
```

### Backend Deployment (Render.io)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command:** `cd backend && npm start`
4. Add environment variables
5. Deploy!

### Database (Neon)

1. Create a [Neon](https://neon.tech) account
2. Create a new project and database
3. Copy the connection string
4. Add to your `DATABASE_URL` environment variable

---

## 🔑 API Keys Setup

### 1. Clerk Authentication

1. Visit [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy **Publishable Key** and **Secret Key**
4. Create a JWT Template in Settings > JWT Templates

### 2. OMDB API

1. Visit [OMDB API](https://www.omdbapi.com/apikey.aspx)
2. Register for a free API key
3. Verify your email
4. Copy your API key

### 3. ImageKit

1. Visit [ImageKit Dashboard](https://imagekit.io/)
2. Create an account
3. Go to Developer Options
4. Copy **Public Key**, **Private Key**, and **URL Endpoint**

### 4. Gemini API (Optional)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy your API key

### 5. Neon Database

1. Visit [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Use it as your `DATABASE_URL`

---

## 🎨 Features in Detail

### 🎬 Movie Management
- Add movies with detailed information
- Upload custom posters or fetch from OMDB
- Edit and delete your movie entries
- Search and filter movies

### 🔍 OMDB Integration
- Search movies by title
- Auto-fill movie details
- Import movie posters
- Access comprehensive movie information

### 🎨 Customization
- Dark/Light theme toggle
- Custom accent colors
- Persistent user preferences
- Responsive design for all devices

### 🔐 Security
- Clerk authentication
- JWT token validation
- Protected API routes
- Secure file uploads

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Prisma](https://www.prisma.io/) - Database ORM
- [Clerk](https://clerk.com/) - Authentication
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Vercel](https://vercel.com/) - Frontend Hosting
- [Render](https://render.com/) - Backend Hosting
- [OMDB API](https://www.omdbapi.com/) - Movie Database
- [Gemini API](https://ai.google.dev/) - AI Integration
- [Zod](https://zod.dev/) - Schema Validation

---

<div align="center">

### Made with ❤️ by [Abishek](https://github.com/cbeAbishek)

⭐ Star this repository if you found it helpful!

</div>

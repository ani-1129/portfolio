# Aniket Singh's Dynamic Portfolio & CMS

A modern, highly customizable personal portfolio built with React (Vite) and Node.js. It features a fully dynamic, password-protected Admin Dashboard (CMS) that allows you to update content in real-time without needing to touch the codebase.

## 🌟 Key Features

- **Dynamic Public Portfolio**: A stunning, responsive single-page portfolio with glassmorphism design, custom cursors, and sleek animations using Framer Motion.
- **Admin Dashboard (CMS)**: A comprehensive content management system to edit Hero text, Projects, Skills, Timeline, Services, Testimonials, and more.
- **Live Preview & Synchronization**: Changes made in the Admin CMS reflect instantly on the public site using React Context.
- **Password-Protected Actions**: Deletions and sensitive operations in the CMS are guarded by secure backend authentication.
- **Zero-Downtime Data Store**: Uses a local JSON-based data store (`db-store.json`) for persistence, ensuring the site runs blazingly fast even without a MongoDB instance.
- **Inbox Management**: A built-in contact form that saves messages directly to the CMS, allowing you to read, export to CSV, or delete inquiries.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Storage**: File-based JSON persistence (fallback to MongoDB)
- **File Uploads**: Multer (saves to `/public/uploads`)

## 🚀 Getting Started

Follow these steps to run the portfolio locally.

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation
Clone the repository and install the dependencies for both the root project and the server.

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Running the Application

This project uses concurrently to run both the frontend and backend simultaneously.

**Start the Backend Server (Port 5000):**
```bash
npm run server
```

**Start the Frontend Vite Dev Server (Port 5173):**
```bash
npm run dev
```

Alternatively, you can run both simultaneously (if you configure a root `start` script):
```bash
npm start
```

### 4. Admin Access

To access the CMS dashboard, navigate to `http://localhost:5173/admin` in your browser.

> **Security Note:** Default admin credentials are required to modify or delete content. Please ensure you change the default credentials before deploying to a production environment. Do not commit your credentials to version control.

## 📂 Project Structure

```
portfolio/
├── server/
│   ├── routes/          # Express API routes (auth, content, messages)
│   ├── index.js         # Backend entry point
│   ├── db-store.json    # Local JSON database storage
│   └── uploads/         # Uploaded images (projects, hero, etc.)
├── src/
│   ├── api/             # Frontend API client
│   ├── components/      # Reusable UI components (Public & Admin)
│   ├── context/         # PortfolioContext for global state
│   ├── layouts/         # Layout wrappers (AdminLayout)
│   ├── pages/           # Page components (PublicPortfolio, Admin pages)
│   ├── App.jsx          # Main React router setup
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Static assets
└── vite.config.js       # Vite configuration
```

## 📝 License

Designed and built by Aniket Singh. All rights reserved.

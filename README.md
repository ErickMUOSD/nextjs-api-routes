# nextjs-api-routes

A Next.js application demonstrating API Routes for a feedback collection system with Bootstrap styling.

## Project Overview

This is a feedback management application built with Next.js that includes:
- A form to submit feedback (email + text)
- API routes to handle feedback storage and retrieval
- A page to view all submitted feedback
- File-based storage using JSON

## Prerequisites

Before running this project, make sure you have the following installed:
- **Node.js** (version 12.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**

## Step-by-Step Guide to Run This Project for the First Time

### Step 1: Navigate to the Project Directory

Open your terminal and navigate to the project folder:

```bash
cd /home/erick/Documents/arguilea/mistery-shopper/nextjs-api-routes
```

### Step 2: Install Dependencies

Install all required npm packages defined in `package.json`:

```bash
npm install
```

This will install:
- Next.js (v10.0.9)
- React (v17.0.2)
- React-DOM (v17.0.2)
- Bootstrap (v5.0.0-beta3)

### Step 3: Start the Development Server

Run the development server:

```bash
npm run dev
```

### Step 4: Open the Application

Once the server starts, open your browser and navigate to:

```
http://localhost:3000
```

### Step 5: Test the Application

1. **Submit Feedback:**
   - On the home page, you'll see a form
   - Enter your email address
   - Enter your feedback text
   - Click "Send" button
   - Check the browser console for the response

2. **View All Feedback:**
   - Click the "Load Feedbacks" button on the home page
   - You'll be redirected to `/feedback` page
   - Click "Show Details" on any feedback item to see the email address

## Available Scripts

- `npm run dev` - Runs the app in development mode (with hot-reload)
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode

## Project Structure

```
├── data/
│   └── feedback.json          # JSON file storing all feedback data
├── pages/
│   ├── index.js               # Home page with feedback form
│   ├── _app.js                # App wrapper component
│   ├── api/
│   │   └── feedback/
│   │       ├── index.js       # API route: GET & POST /api/feedback
│   │       └── [feedbackId].js # API route: GET /api/feedback/:id
│   └── feedback/
│       └── index.js           # Page to display all feedback
├── public/                    # Static assets
├── styles/
│   └── globals.css           # Global styles
└── package.json              # Project dependencies
```

## How It Works

1. **Submitting Feedback:** When you submit the form on the home page, it sends a POST request to `/api/feedback` which stores the data in `data/feedback.json`

2. **Viewing Feedback:** The feedback page uses `getStaticProps` to load all feedback at build time, and allows you to fetch individual feedback details via the `/api/feedback/[feedbackId]` endpoint

3. **Data Storage:** All feedback is stored in a JSON file (`data/feedback.json`) - no database required

## Technologies Used

- **Next.js 10.0.9** - React framework with API routes and SSG
- **React 17.0.2** - UI library
- **Bootstrap 5.0.0-beta3** - CSS framework for styling

## Troubleshooting

- If port 3000 is already in use, you can specify a different port:
  ```bash
  npm run dev -- -p 3001
  ```

- If you encounter any module errors, try deleting `node_modules` and reinstalling:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```



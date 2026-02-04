# nextjs-api-routes

A Next.js application demonstrating API Routes for a feedback collection system with Bootstrap styling.

## Project Overview

This is a feedback management application built with Next.js that includes:
- A form to submit feedback (email + text)
- API routes to handle feedback storage and retrieval
- A page to view all submitted feedback
- **MySQL database storage** (AWS RDS compatible)
- Environment variable configuration for database credentials
- Database connection testing endpoint
- Built for deployment on AWS Amplify

## Features

✅ Next.js 13 with API Routes  
✅ MySQL database integration with connection pooling  
✅ AWS RDS compatible  
✅ Environment-based configuration  
✅ Automatic database table initialization  
✅ Bootstrap 5 styling  
✅ Production-ready for AWS Amplify  

## Prerequisites

Before running this project, make sure you have the following installed:
- **Node.js** (version 12.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **MySQL database** (local installation or AWS RDS instance)
- Database credentials (host, user, password, database name)

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
- Next.js (v13.5.6)
- React (v18.2.0)
- React-DOM (v18.2.0)
- Bootstrap (v5.3.2)
- mysql2 (MySQL client for Node.js)

### Step 3: Configure Environment Variables

Create a `.env.local` file for your database credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your database credentials:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=feedback_db
```

**For AWS RDS**, use your RDS endpoint:
```bash
DB_HOST=your-db.abc123.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=your-secure-password
DB_NAME=feedback_db
```

**Note:** Never commit `.env.local` to git! It's already in `.gitignore`.

### Step 4: Test Database Connection

Before starting the app, test your database connection:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/db-test`

You should see a success message if the connection works.

### Step 5: Start the Development Server

Run the development server:

```bash
npm run dev
```

### Step 6: Open the Application

Once the server starts, open your browser and navigate to:

```
http://localhost:3000
```

### Step 7: Test the Application

1. **Test Database Connection:**
   - Visit `http://localhost:3000/api/db-test`
   - You should see a success message

2. **Submit Feedback:**
   - On the home page, you'll see a form
   - Enter your email address
   - Enter your feedback text
   - Click "Send" button
   - Data is saved to MySQL database

3. **View All Feedback:**
   - Click the "Load Feedbacks" button on the home page
   - You'll be redirected to `/feedback` page
   - Click "Show Details" on any feedback item to see full details

## Available Scripts

- `npm run dev` - Runs the app in development mode (with hot-reload)
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode

## Project Structure

```
├── lib/
│   └── db.js                  # MySQL database connection and queries
├── pages/
│   ├── index.js               # Home page with feedback form
│   ├── _app.js                # App wrapper component
│   ├── api/
│   │   ├── db-test.js         # API route: Test database connection
│   │   └── feedback/
│   │       ├── index.js       # API route: GET & POST /api/feedback
│   │       └── [feedbackId].js # API route: GET /api/feedback/:id
│   └── feedback/
│       └── index.js           # Page to display all feedback
├── public/                    # Static assets
├── styles/
│   └── globals.css            # Global styles
├── .env.local.example         # Example environment variables
├── package.json               # Project dependencies
├── README.md                  # This file
└── RDS_AMPLIFY_SETUP.md       # AWS deployment guide
```

## How It Works

1. **Database Connection:** The app connects to MySQL database using connection pooling for better performance. Connection details are read from environment variables.

2. **Submitting Feedback:** When you submit the form on the home page, it sends a POST request to `/api/feedback` which:
   - Validates the input
   - Inserts the data into MySQL `feedback` table
   - Returns success response

3. **Viewing Feedback:** The feedback page uses `getStaticProps` to load all feedback from MySQL at build time, and allows you to fetch individual feedback details via the `/api/feedback/[feedbackId]` endpoint

4. **Data Storage:** All feedback is stored in MySQL database with automatic table creation on first run

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/db-test` | Test database connection and initialize table |
| POST | `/api/feedback` | Create new feedback entry |
| GET | `/api/feedback` | Get all feedback entries |
| GET | `/api/feedback/:id` | Get specific feedback by ID |

## Technologies Used

- **Next.js 13.5.6** - React framework with API routes and SSG
- **React 18.2.0** - UI library
- **Bootstrap 5.3.2** - CSS framework for styling
- **mysql2** - MySQL client for Node.js with promises support
- **AWS RDS** - Managed MySQL database (production)

## AWS Amplify Deployment

For detailed instructions on deploying to AWS Amplify with RDS MySQL, see:
📘 **[RDS_AMPLIFY_SETUP.md](./RDS_AMPLIFY_SETUP.md)**

Quick summary:
1. Create RDS MySQL instance
2. Configure security groups
3. Push code to GitHub
4. Deploy to Amplify
5. Add environment variables in Amplify console
6. Test the connection

## Troubleshooting

### Database Connection Issues

- **Error: "Database connection failed"**
  - Check that your MySQL server is running
  - Verify environment variables are set correctly
  - Test connection: visit `http://localhost:3000/api/db-test`
  - Check RDS security group allows inbound traffic on port 3306

- **Error: "Access denied for user"**
  - Verify DB_USER and DB_PASSWORD are correct
  - Ensure user has permissions on the database

- **Error: "Unknown database"**
  - Create the database: `CREATE DATABASE feedback_db;`
  - Or update DB_NAME to match existing database

### Application Issues

- If port 3000 is already in use, you can specify a different port:
  ```bash
  npm run dev -- -p 3001
  ```

- If you encounter any module errors, try deleting `node_modules` and reinstalling:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```



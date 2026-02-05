import mysql from 'mysql2/promise';
import { defineAuth, secret } from '@aws-amplify/backend';

// Create a connection pool for better performance
let pool;

export function getPool() {
	if (!pool) {
		pool = mysql.createPool({
			host: secret("DB_HOST") || process.env.DB_HOST,
			port: 3306,
			user: secret("DB_USER"),
			password: secret("DB_PASSWORD"),
			database: secret("DB_NAME"),
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			enableKeepAlive: true,
			keepAliveInitialDelay: 0
		});
	}
	return pool;
}

// Test database connection
export async function testConnection() {
	try {
		const pool = getPool();
		const connection = await pool.getConnection();
		console.log('✅ Database connection successful!');
		connection.release();
		return { success: true, message: 'Database connection successful' };
	} catch (error) {
		console.error('❌ Database connection failed:', error.message);
		return { success: false, message: error.message };
	}
}

// Initialize feedback table if it doesn't exist
export async function initializeFeedbackTable() {
	try {
		const pool = getPool();
		const createTableQuery = `
			CREATE TABLE IF NOT EXISTS feedback (
				id VARCHAR(255) PRIMARY KEY,
				email VARCHAR(255) NOT NULL,
				text TEXT NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`;
		await pool.execute(createTableQuery);
		console.log('✅ Feedback table initialized');
		return { success: true };
	} catch (error) {
		console.error('❌ Error initializing table:', error.message);
		return { success: false, error: error.message };
	}
}

// Get all feedback from database
export async function getAllFeedback() {
	try {
		const pool = getPool();
		const [rows] = await pool.execute(
			'SELECT id, email, text, created_at FROM feedback ORDER BY created_at DESC'
		);
		return rows;
	} catch (error) {
		console.error('❌ Error fetching feedback:', error.message);
		throw error;
	}
}

// Get single feedback by ID
export async function getFeedbackById(id) {
	try {
		const pool = getPool();
		const [rows] = await pool.execute(
			'SELECT id, email, text, created_at FROM feedback WHERE id = ?',
			[id]
		);
		return rows[0] || null;
	} catch (error) {
		console.error('❌ Error fetching feedback by ID:', error.message);
		throw error;
	}
}

// Insert new feedback
export async function insertFeedback(feedback) {
	try {
		const pool = getPool();
		const { id, email, text } = feedback;
		await pool.execute(
			'INSERT INTO feedback (id, email, text) VALUES (?, ?, ?)',
			[id, email, text]
		);
		return feedback;
	} catch (error) {
		console.error('❌ Error inserting feedback:', error.message);
		throw error;
	}
}

import { testConnection, initializeFeedbackTable } from '../../lib/db';

async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			// Test database connection
			const connectionTest = await testConnection();

			if (!connectionTest.success) {
				return res.status(500).json({
					success: false,
					message: 'Database connection failed',
					error: connectionTest.message,
					envCheck: {
						hasHost: !!process.env.DB_HOST,
						hasUser: !!process.env.DB_USER,
						hasPassword: !!process.env.DB_PASSWORD,
						hasDatabase: !!process.env.DB_NAME
					}
				});
			}

			// Initialize table
			const tableInit = await initializeFeedbackTable();

			return res.status(200).json({
				success: true,
				message: 'Database connection successful and feedback table initialized',
				connection: connectionTest,
				table: tableInit,
				timestamp: new Date().toISOString()
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'Error testing database connection',
				error: error.message
			});
		}
	} else {
		res.status(405).json({ message: 'Method not allowed. Use GET.' });
	}
}

export default handler;

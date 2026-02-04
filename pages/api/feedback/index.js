import { getAllFeedback, insertFeedback, initializeFeedbackTable } from '../../../lib/db';

async function handler(req, res) {
	try {
		// Initialize table on first request (idempotent operation)
		await initializeFeedbackTable();

		if (req.method === 'POST') {
			const { email, text } = req.body;

			// Validate input
			if (!email || !text) {
				return res.status(400).json({
					message: 'Email and text are required',
					error: 'Validation failed'
				});
			}

			const newFeedback = {
				id: new Date().toISOString(), // More unique than toDateString
				email: email,
				text: text
			};

			// Insert into MySQL database
			await insertFeedback(newFeedback);

			return res.status(201).json({
				message: 'Success',
				feedback: newFeedback,
				source: 'MySQL RDS'
			});
		} else if (req.method === 'GET') {
			// Get all feedback from MySQL database
			const data = await getAllFeedback();
			return res.status(200).json({
				feedback: data,
				count: data.length,
				source: 'MySQL RDS'
			});
		} else {
			return res.status(405).json({ message: 'Method not allowed. Use GET or POST.' });
		}
	} catch (error) {
		console.error('API Error:', error);
		return res.status(500).json({
			message: 'Database error',
			error: error.message,
			hint: 'Check your database connection settings in environment variables'
		});
	}
}

export default handler;

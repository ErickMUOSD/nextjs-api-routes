import { getFeedbackById } from '../../../lib/db';

async function handler(req, res) {
	try {
		const feedbackId = req.query.feedbackId;

		if (!feedbackId) {
			return res.status(400).json({
				message: 'Feedback ID is required',
				error: 'Missing parameter'
			});
		}

		const selectedFeedback = await getFeedbackById(feedbackId);

		if (!selectedFeedback) {
			return res.status(404).json({
				message: 'Feedback not found',
				feedbackId: feedbackId
			});
		}

		return res.status(200).json({
			feedback: selectedFeedback,
			source: 'MySQL RDS'
		});
	} catch (error) {
		console.error('API Error:', error);
		return res.status(500).json({
			message: 'Database error',
			error: error.message
		});
	}
}

export default handler;

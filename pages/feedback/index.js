import { useState, Fragment } from 'react';
import { getAllFeedback } from '../../lib/db';

function FeedbackPage(props) {
	const [ feedbackData, setFeedbackData ] = useState();

	function loadFeedbackHandler(id) {
		fetch(`/api/feedback/${id}`).then((response) => response.json()).then((data) => {
			setFeedbackData(data.feedback);
		});
	}

	return (
		<Fragment>
			<div className="container">
				{feedbackData && (
					<div className="text-center my-4">
						<h1>{feedbackData.email}</h1>
						<p className="text-muted">ID: {feedbackData.id}</p>
					</div>
				)}
				<ul className="list-group my-4">
					{props.feedbackItems.map(({ id, text, email }) => (
						<li key={id} className="list-group-item d-flex justify-content-between">
							<div>
								<strong>{text}</strong>
								<br />
								<small className="text-muted">{email}</small>
							</div>
							<div>
								<button onClick={loadFeedbackHandler.bind(null, id)} className="btn btn-primary btn-sm">
									Show Details
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	try {
		const data = await getAllFeedback();
		return {
			props: {
				feedbackItems: JSON.parse(JSON.stringify(data)) // Serialize dates
			},
			revalidate: 10 // Revalidate every 10 seconds
		};
	} catch (error) {
		console.error('Error fetching feedback:', error);
		return {
			props: {
				feedbackItems: []
			},
			revalidate: 10
		};
	}
}

export default FeedbackPage;

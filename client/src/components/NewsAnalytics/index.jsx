import React, {useEffect, useState} from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";

const NewsAnalytics = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newsAnalytics, setNewsAnalytics] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	const fetchNewsAnalytics = async () => {
		try {
			setLoading(true);
			const newsResults = await fetch('http://localhost:3002/api/kafka-reporting');
			const newsAnalytics = await newsResults.json();

			setNewsAnalytics(newsAnalytics);
			setLoading(false);
		} catch (err) {
			setTemporaryError(err.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchNewsAnalytics();
	}, []);

	return loading
		? <Loading />
		: (
			<Segment>
				{error && <Message negative content={error}/>}
				{newsAnalytics && <div>data fetched</div>}
			</Segment>
		);
}

export default NewsAnalytics;

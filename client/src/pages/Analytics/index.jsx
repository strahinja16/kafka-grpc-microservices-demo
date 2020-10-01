/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { Message, Segment } from 'semantic-ui-react';
import { Loading, UserAnalytics, NewsAnalytics } from "../../components";

const Analytics = () => {
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(null);
	// const [userAnalytics, setUserAnalytics] = useState(null);
	// const [newsAnalytics, setNewsAnalytics] = useState(null);
	//
	// const setTemporaryError = (err) => {
	// 	setError(err);
	// 	setTimeout(() => setError(''), 3000);
	// }
	//
	// const fetchAnalytics = async () => {
	// 	try {
	// 		setLoading(true);
	// 		// const userResults = await fetch('http://localhost:3001/api/kafka-reporting');
	// 		const newsResults = await fetch('http://localhost:3002/api/kafka-reporting');
	// 		// const userAnalytics = await userResults.json();
	// 		const newsAnalytics = await newsResults.json();
	//
	// 		setUserAnalytics(userAnalytics);
	// 		setNewsAnalytics(newsAnalytics);
	// 		setLoading(false);
	// 	} catch (err) {
	// 		setTemporaryError(err.message);
	// 		setLoading(false);
	// 	}
	// }
	//
	// console.log('render');

	return (
		<Segment>
			{/*{error && <Message negative content={error}/>}*/}
			<UserAnalytics />
			<NewsAnalytics />
		</Segment>
	);
}

export default Analytics;

import React, { useEffect, useState } from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";
import AgeGroupReports from "../AgeGroupReports";

const UserAnalytics = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userAnalytics, setUserAnalytics] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	const fetchUserAnalytics = async () => {
		try {
			setLoading(true);
			const userResults = await fetch('http://localhost:3001/api/kafka-reporting');
			const userAnalytics = await userResults.json();

			setUserAnalytics(userAnalytics);
			setLoading(false);
		} catch (err) {
			setTemporaryError(err.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchUserAnalytics();
	}, []);

	const renderAgeGroupReports = (userAnalytics) => {
		if (!userAnalytics) {
			return null;
		}

		const { ageGroupReports } = userAnalytics;

		const ageGroups = [...new Set(ageGroupReports.map(report => report.ageGroup))];

		return (
			<Segment>
				<h3>Age group reports</h3>
				{ageGroups.map(ag => {
					const groupReports = ageGroupReports.filter(report => report.ageGroup === ag);

					return <AgeGroupReports ageGroup={ag} reports={groupReports} />
				})}
			</Segment>
		)
	};

	return loading
		? <Loading />
		: (
			<Segment>
				{error && <Message negative content={error}/>}
				{renderAgeGroupReports(userAnalytics)}
			</Segment>
		);
}

export default UserAnalytics;

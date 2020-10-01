import React, { useEffect, useState } from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";
import AgeGroupReports from "./AgeGroupAnalytics/AgeGroupReports";
import CountryReports from "./CountryAnalytics/CountryReports";

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
		return <AgeGroupReports ageGroupReports={ageGroupReports} />
	};

	const renderCountryReports = (userAnalytics) => {
		if (!userAnalytics) {
			return null;
		}

		const { countryReports } = userAnalytics;
		return <CountryReports countryReports={countryReports} />
	};

	return loading
		? <Loading />
		: (
			<Segment>
				<h2>User analytics</h2>
				{error && <Message negative content={error}/>}
				{renderAgeGroupReports(userAnalytics)}
				{renderCountryReports(userAnalytics)}
			</Segment>
		);
}

export default UserAnalytics;

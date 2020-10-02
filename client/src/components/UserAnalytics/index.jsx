import React, { useEffect, useState } from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";
import AgeGroupReports from "./AgeGroupReports";
import CountryReports from "./CountryReports";
import socketIOClient from "socket.io-client";

const UserAnalytics = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userAnalytics, setUserAnalytics] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	useEffect(() => {
		(async () => {
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
		})();

		const socket = socketIOClient('http://localhost:3001');
		socket.on("test", data => console.log(data));
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

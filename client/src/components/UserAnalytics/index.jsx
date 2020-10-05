import React, { useEffect, useState } from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";
import AgeGroupReports from "./AgeGroupReports";
import CountryReports from "./CountryReports";

const UserAnalytics = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [ageGroupReports, setAgeGroupReports] = useState(null);
	const [countryReports, setCountryReports] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const userResults = await fetch('http://localhost:3001/api/kafka-reporting');
				const { ageGroupReports, countryReports } = await userResults.json();

				setAgeGroupReports(ageGroupReports);
				setCountryReports(countryReports);

				setLoading(false);
			} catch (err) {
				setTemporaryError(err.message);
				setLoading(false);
			}
		})();
	}, []);

	const renderAgeGroupReports = (ageGroupReports) => {
		if (!ageGroupReports) {
			return null;
		}

		return <AgeGroupReports ageGroupReports={ageGroupReports} setAgeGroupReports={setAgeGroupReports} />
	};

	const renderCountryReports = (countryReports) => {
		if (!countryReports) {
			return null;
		}

		return <CountryReports countryReports={countryReports} setCountryReports={setCountryReports} />
	};

	return loading
		? <Loading />
		: (
			<Segment>
				<h2>User analytics</h2>
				{error && <Message negative content={error}/>}
				{renderCountryReports(countryReports)}
				{renderAgeGroupReports(ageGroupReports)}
			</Segment>
		);
}

export default UserAnalytics;

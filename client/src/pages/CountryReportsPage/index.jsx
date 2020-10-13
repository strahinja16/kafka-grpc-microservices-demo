import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import CountryReports from "../../components/UserAnalytics/CountryReports";
import Loading from "../../components/Loading";

const CountryReportsPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
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
				const { countryReports } = await userResults.json();

				setCountryReports(countryReports);

				setLoading(false);
			} catch (err) {
				setTemporaryError(err.message);
				setLoading(false);
			}
		})();
	}, []);

	const renderCountryReports = (countryReports) => {
		if (!countryReports) {
			return null;
		}

		return <CountryReports countryReports={countryReports} setCountryReports={setCountryReports} />
	};

	return loading
		? <Loading />
		: (
			<section>
				{error && <Message negative content={error}/>}
				{renderCountryReports(countryReports)}
			</section>
		);
}

export default CountryReportsPage;

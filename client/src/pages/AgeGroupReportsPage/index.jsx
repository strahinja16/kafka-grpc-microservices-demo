import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import AgeGroupReports from "../../components/UserAnalytics/AgeGroupReports";
import Loading from "../../components/Loading";

const AgeGroupReportsPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [ageGroupReports, setAgeGroupReports] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const userResults = await fetch(`${process.env.REACT_APP_USER_SERVICE}/api/kafka-reporting`);
				const { ageGroupReports } = await userResults.json();

				setAgeGroupReports(ageGroupReports);

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

	return loading
		? <Loading />
		: (
			<section>
				{error && <Message negative content={error}/>}
				{renderAgeGroupReports(ageGroupReports)}
			</section>
		);
}

export default AgeGroupReportsPage;

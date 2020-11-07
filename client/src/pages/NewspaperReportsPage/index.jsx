import React, {useEffect, useRef, useState} from 'react';
import { Message } from 'semantic-ui-react';
import Loading from "../../components/Loading";
import NewspaperReports from "../../components/NewsAnalytics/NewspaperReports";
import socketIOClient from "socket.io-client";

const NewspaperReportsPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newspaperReports, setNewspaperReports] = useState(null);

	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = socketIOClient(process.env.REACT_APP_NEWS_SERVICE);
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		}
	})

	useEffect(() => {
		if (!socketRef.current) {
			return;
		}

		socketRef.current.on("newspaperArticleCountByCategoryReports", newspaperReportsUpdate => {
			const updatedNewspaperReports = newspaperReports.map(rep => {
				return rep._id === newspaperReportsUpdate._id ? newspaperReportsUpdate : rep;
			});
			setNewspaperReports(updatedNewspaperReports);
		});
	});

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const newsAnalytics = await fetch(`${process.env.REACT_APP_NEWS_SERVICE}/api/kafka-reporting`);
				const { newspaperArticleCountByCategoryReports } = await newsAnalytics.json();

				setNewspaperReports(newspaperArticleCountByCategoryReports);

				setLoading(false);
			} catch (err) {
				setTemporaryError(err.message);
				setLoading(false);
			}
		})();
	}, []);

	const renderNewspaperReports = (newspaperReports) => {
		if (!newspaperReports) {
			return null;
		}

		return <NewspaperReports newspaperReports={newspaperReports} />
	};

	return loading
		? <Loading />
		: (
			<section>
				{error && <Message negative content={error}/>}
				{renderNewspaperReports(newspaperReports)}
			</section>
		);
}

export default NewspaperReportsPage;

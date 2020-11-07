import React, {useEffect, useState} from 'react';
import { Message, Segment } from 'semantic-ui-react';
import Loading from "../Loading";
import ArticleCountByCategoryReports from "./ArticleCountByCategoryReports";
import GlobalReports from "./GlobalReports";
import NewspaperReports from "./NewspaperReports";

const NewsAnalytics = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newsAnalytics, setNewsAnalytics] = useState(null);

	const setTemporaryError = (err) => {
		setError(err);
		setTimeout(() => setError(''), 3000);
	}

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const newsResults = await fetch(`${process.env.REACT_APP_NEWS_SERVICE}/api/kafka-reporting`);
				const newsAnalytics = await newsResults.json();

				setNewsAnalytics(newsAnalytics);
				setLoading(false);
			} catch (err) {
				setTemporaryError(err.message);
				setLoading(false);
			}
		})();
	}, []);

	const renderArticleCountByCategoryAnalytics = (newsAnalytics) => {
		if (!newsAnalytics) {
			return null;
		}

		const { articleCountByCategoryReports } = newsAnalytics;
		return <ArticleCountByCategoryReports articleCountByCategoryReports={articleCountByCategoryReports} />
	};

	const renderGlobalReports = (newsAnalytics) => {
		if (!newsAnalytics) {
			return null;
		}

		const { globalReports } = newsAnalytics;
		return <GlobalReports globalReports={globalReports} />
	};

	const renderNewspaperReports = (newsAnalytics) => {
		if (!newsAnalytics) {
			return null;
		}

		const { newspaperArticleCountByCategoryReports } = newsAnalytics;
		return <NewspaperReports newspaperReports={newspaperArticleCountByCategoryReports} />
	};

	return loading
		? <Loading />
		: (
			<Segment>
				<h2>News analytics</h2>
				{error && <Message negative content={error}/>}
				{renderArticleCountByCategoryAnalytics(newsAnalytics)}
				{renderGlobalReports(newsAnalytics)}
				{renderNewspaperReports(newsAnalytics)}
			</Segment>
		);
}

export default NewsAnalytics;

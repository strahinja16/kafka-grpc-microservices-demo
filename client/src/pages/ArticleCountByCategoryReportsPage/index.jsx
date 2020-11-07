import React, {useEffect, useRef, useState} from 'react';
import {Message, Segment} from 'semantic-ui-react';
import Loading from "../../components/Loading";
import ArticleCountByCategoryReports from "../../components/NewsAnalytics/ArticleCountByCategoryReports";
import GlobalReports from "../../components/NewsAnalytics/GlobalReports";
import socketIOClient from "socket.io-client";

const ArticleCountByCategoryReportsPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [articleCountByCategoryReports, setArticleCountByCategoryReports] = useState(null);
	const [globalReports, setGlobalReports] = useState(null);

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

		// socketRef.current.on("globalReports", globalReportsUpdate => {
		// 	const updatedGlobalReports = [globalReportsUpdate];
		// 	setGlobalReports(updatedGlobalReports);
		// });

		socketRef.current.on("articleCountByCategoryReports", articleCountByCategoryUpdate => {
			const updatedArticleCountByCategoryReports = articleCountByCategoryReports.map(rep => {
				return rep._id === articleCountByCategoryUpdate._id ? articleCountByCategoryUpdate : rep;
			})

			setArticleCountByCategoryReports(updatedArticleCountByCategoryReports);

			const updatedGlobalReports = [{ articlesCount: globalReports[0].articlesCount + 1 }];
			setGlobalReports(updatedGlobalReports);
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
				const { articleCountByCategoryReports, globalReports } = await newsAnalytics.json();

				setArticleCountByCategoryReports(articleCountByCategoryReports);
				setGlobalReports(globalReports);

				setLoading(false);
			} catch (err) {
				setTemporaryError(err.message);
				setLoading(false);
			}
		})();
	}, []);

	const renderArticleCountByCategoryAnalytics = (articleCountByCategoryReports) => {
		if (!articleCountByCategoryReports) {
			return null;
		}

		return <ArticleCountByCategoryReports articleCountByCategoryReports={articleCountByCategoryReports} />
	};

	const renderGlobalReports = (globalReports) => {
		if (!globalReports) {
			return null;
		}

		return <GlobalReports globalReports={globalReports} />
	};

	return loading
		? <Loading />
		: (
			<Segment style={{ margin: 0 }}>
				{error && <Message negative content={error}/>}
				<h3>Article count and global reports</h3>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					{renderArticleCountByCategoryAnalytics(articleCountByCategoryReports)}
					{renderGlobalReports(globalReports)}
				</div>
			</Segment>
		);
}

export default ArticleCountByCategoryReportsPage;

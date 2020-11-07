import React from 'react';
import './style.scss';

const GlobalReports = ({ globalReports }) => {
	const { articlesCount } = globalReports[0];

	return (
		<div style={{ padding: '20px', border: '1px solid rgba(34,36,38,.15)'}}>
			<h3>Global reports</h3>
			<div>Articles count: {articlesCount}</div>
		</div>
	);
};
export default GlobalReports;

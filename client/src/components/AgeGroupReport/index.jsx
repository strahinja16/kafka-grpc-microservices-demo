import React from 'react';

const AgeGroupReport = ({ report }) => {
	const { category, searchCount } = report;

	return (
		<div>{category} - {searchCount}</div>
	);
};
export default AgeGroupReport;

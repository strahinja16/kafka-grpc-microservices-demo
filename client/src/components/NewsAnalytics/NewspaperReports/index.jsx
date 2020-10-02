import React from 'react';
import {Segment} from "semantic-ui-react";
import NewspaperReport from "../NewspaperReport";
import './style.scss';

const NewspaperReports = ({ newspaperReports }) => {
	const newspapers = [...new Set(newspaperReports.map(report => report.newspaper))];

	return (
		<Segment>
			<h3>Newspaper article count by category</h3>
			<div className="reports-container">
				{newspapers.map(newspaper => {
					const reports = newspaperReports.filter(report => report.newspaper === newspaper);

					return <NewspaperReport key={newspaper} newspaper={newspaper} reports={reports} />
				})}
			</div>
		</Segment>
	);
};
export default NewspaperReports;

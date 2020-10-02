import React from 'react';
import {Segment} from "semantic-ui-react";
import AgeGroupReport from "../AgeGroupReport";
import './style.scss';

const AgeGroupReports = ({ ageGroupReports }) => {
	const ageGroups = [...new Set(ageGroupReports.map(report => report.ageGroup))];

	return (
		<Segment>
			<h3>Age group reports</h3>
			<div className="reports-container">
				{ageGroups.map(ageGroup => {
					const groupReports = ageGroupReports.filter(report => report.ageGroup === ageGroup);

					return <AgeGroupReport key={ageGroup} ageGroup={ageGroup} reports={groupReports}/>
				})}
			</div>
		</Segment>
	);
};
export default AgeGroupReports;

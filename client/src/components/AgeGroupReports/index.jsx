import React from 'react';
import {Segment} from "semantic-ui-react";
import AgeGroupReport from "../AgeGroupReport";

const AgeGroupReports = ({ ageGroup, reports }) => (
	<Segment>
		<h4>{ageGroup}</h4>
		{reports.map(report => <AgeGroupReport report={report} />)}
	</Segment>
);
export default AgeGroupReports;

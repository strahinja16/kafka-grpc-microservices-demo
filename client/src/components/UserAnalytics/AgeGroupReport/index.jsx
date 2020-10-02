import React from 'react';
import {Segment} from "semantic-ui-react";

const AgeGroupReport = ({ ageGroup, reports }) => (
	<Segment>
		<h4>Age group: <span>{ageGroup}</span></h4>
		<div>Category -> search count</div>
		{reports.map(({category, searchCount}) => <div key={category}>{category} - {searchCount}</div>)}
	</Segment>
);
export default AgeGroupReport;

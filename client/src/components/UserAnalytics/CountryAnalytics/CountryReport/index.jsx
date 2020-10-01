import React from 'react';
import {Segment} from "semantic-ui-react";

const CountryReport = ({ country, reports }) => (
	<Segment>
		<h4>Country: <span>{country}</span></h4>
		<div>category -> search count</div>
		{reports.map(({category, searchCount}) => <div>{category} - {searchCount}</div>)}
	</Segment>
);
export default CountryReport;

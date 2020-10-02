import React from 'react';
import {Segment} from "semantic-ui-react";

const NewspaperReport = ({ newspaper, reports }) => (
	<Segment>
		<h4>Newspaper: <span>{newspaper}</span></h4>
		<div>Category -> articles count</div>
		{reports.map(({category, articlesCount}) => <div key={category}>{category} - {articlesCount}</div>)}
	</Segment>
);
export default NewspaperReport;

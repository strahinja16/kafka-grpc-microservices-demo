import React from 'react';
import {Segment} from "semantic-ui-react";
import './style.scss';

const GlobalReports = ({ globalReports }) => {
	const { articlesCount } = globalReports[0];
	return (
		<Segment>
			<h3>Global reports</h3>
			<div>Articles count: {articlesCount}</div>
		</Segment>
	);
};
export default GlobalReports;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { UserAnalytics, NewsAnalytics } from "../../components";

const Analytics = () => (
	<Segment>
		<UserAnalytics/>
		<NewsAnalytics/>
	</Segment>
);

export default Analytics;

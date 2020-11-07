import React from 'react';
import {Segment} from "semantic-ui-react";
import CategorySearchCount from "../CategorySearchCount";

const AgeGroupReport = ({ ageGroup, reports }) => (
	<Segment>
		<h4>Age group: <span>{ageGroup}</span></h4>
		<div>Category -> search count</div>
		{reports.map(({category, searchCount}) => {
			return <CategorySearchCount key={category + searchCount} category={category} searchCount={searchCount} />
		})}
	</Segment>
);
export default AgeGroupReport;

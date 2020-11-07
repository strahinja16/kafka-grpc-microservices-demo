import React from 'react';
import {Segment} from "semantic-ui-react";
import CategorySearchCount from "../CategorySearchCount";

const CountryReport = ({ country, reports }) => (
	<Segment>
		<h4>Country: <span>{country}</span></h4>
		<div>category -> search count</div>
		{reports.map(({category, searchCount}) => {
			return <CategorySearchCount key={category + searchCount} category={category} searchCount={searchCount} />
		})}
	</Segment>
);
export default CountryReport;

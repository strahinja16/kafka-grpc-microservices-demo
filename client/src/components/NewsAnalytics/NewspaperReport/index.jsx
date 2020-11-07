import React from 'react';
import {Segment} from "semantic-ui-react";
import CategoryArticlesCount from "../CategoryArticlesCount";

const NewspaperReport = ({ newspaper, reports }) => (
	<Segment>
		<h4>Newspaper: <span>{newspaper}</span></h4>
		<div>Category -> articles count</div>
		{reports.map(({category, articlesCount}) => {
			return <CategoryArticlesCount
				key={category + articlesCount}
				category={category}
				articlesCount={articlesCount}
			/>
		})}
	</Segment>
);
export default NewspaperReport;

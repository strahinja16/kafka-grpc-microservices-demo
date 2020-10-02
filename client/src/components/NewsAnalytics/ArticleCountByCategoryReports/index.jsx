import React from 'react';
import {Segment} from "semantic-ui-react";
import './style.scss';

const ArticleCountByCategoryReports = ({ articleCountByCategoryReports }) => (
	<Segment>
		<h3>Article count by category reports</h3>
		{articleCountByCategoryReports.map(({category, articlesCount}) => {
			return <div key={category}>{category} - {articlesCount}</div>
		})}
	</Segment>
);
export default ArticleCountByCategoryReports;

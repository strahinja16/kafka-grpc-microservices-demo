import React from 'react';
import './style.scss';
import CategoryArticlesCount from "../CategoryArticlesCount";

const ArticleCountByCategoryReports = ({ articleCountByCategoryReports }) => (
	<div style={{ padding: '20px', border: '1px solid rgba(34,36,38,.15)' }}>
		<h3>Article count by category reports</h3>
		{articleCountByCategoryReports.map(({category, articlesCount}) => {
			return <CategoryArticlesCount
				key={category + articlesCount}
				category={category}
				articlesCount={articlesCount}
			/>
		})}
	</div>
);
export default ArticleCountByCategoryReports;

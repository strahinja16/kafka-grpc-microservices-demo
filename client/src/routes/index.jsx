import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CountryReportsPage from "../pages/CountryReportsPage";
import AgeGroupReportsPage from "../pages/AgeGroupReportsPage";
import NewsPaperReportsPage from "../pages/NewspaperReportsPage";
import ArticleCountByCategoryReportsPage from "../pages/ArticleCountByCategoryReportsPage";

const Routes = () => (
	<Switch>
		<Route path="/country-reports" exact component={CountryReportsPage} />
		<Route path="/age-group-reports" exact component={AgeGroupReportsPage} />
		<Route path="/newspaper-reports" exact component={NewsPaperReportsPage} />
		<Route path="/article-count-by-category-reports" exact component={ArticleCountByCategoryReportsPage} />
		<Redirect to="/country-reports" />
	</Switch>
);

export default Routes;

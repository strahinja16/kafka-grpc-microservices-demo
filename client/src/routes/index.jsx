import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CountryReportsPage from "../pages/CountryReportsPage";
import AgeGroupReportsPage from "../pages/AgeGroupReportsPage";

const Routes = () => (
	<Switch>
		<Route path="/country-reports" exact component={CountryReportsPage} />
		<Route path="/age-group-reports" exact component={AgeGroupReportsPage} />
		<Redirect to="/country-reports" />
	</Switch>
);

export default Routes;

import React from 'react';
import {Segment} from "semantic-ui-react";
import CountryReport from "../CountryReport";
import './style.scss';

const CountryReports = ({ countryReports }) => {
	const countries = [...new Set(countryReports.map(report => report.country))];

	return (
		<Segment>
			<h3>Country reports</h3>
			<div className="reports-container">
				{countries.map(country => {
					const singleCountryReports = countryReports.filter(report => report.country === country);

					return <CountryReport country={country} reports={singleCountryReports}/>
				})}
			</div>
		</Segment>
	);
};
export default CountryReports;

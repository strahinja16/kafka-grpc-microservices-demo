import React, { useEffect, useRef } from 'react';
import { Segment } from "semantic-ui-react";
import CountryReport from "../CountryReport";
import socketIOClient from "socket.io-client";
import './style.scss';

const CountryReports = ({ countryReports, setCountryReports }) => {
	const countries = [...new Set(countryReports.map(report => report.country))];
	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = socketIOClient(process.env.REACT_APP_USER_SERVICE);
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		}
	})

	useEffect(() => {
		if (!socketRef.current) {
			return;
		}

		socketRef.current.on("countryReports", countryReportsUpdate => {
			const updatedReports = [...countryReports.map(report => {
				return report._id === countryReportsUpdate._id
					? {...countryReportsUpdate}
					: report;
			})]

			setCountryReports(updatedReports)
		});
	});

	return (
		<Segment>
			<h3>Country reports</h3>
			<div className="reports-container">
				{countries.map(country => {
					const singleCountryReports = countryReports.filter(report => report.country === country);

					return <CountryReport key={country} country={country} reports={singleCountryReports}/>
				})}
			</div>
		</Segment>
	);
};
export default CountryReports;

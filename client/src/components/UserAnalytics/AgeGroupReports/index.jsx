import React, { useEffect, useRef } from 'react';
import { Segment } from "semantic-ui-react";
import AgeGroupReport from "../AgeGroupReport";
import socketIOClient from "socket.io-client";
import './style.scss';

const AgeGroupReports = ({ ageGroupReports, setAgeGroupReports }) => {
	const ageGroups = [...new Set(ageGroupReports.map(report => report.ageGroup))];
	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT);
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

		socketRef.current.on("ageGroupReports", ageGroupReportsUpdate => {
			const updatedReports = [...ageGroupReports.map(report => {
				return report._id === ageGroupReportsUpdate._id
					? {...ageGroupReportsUpdate}
					: report;
			})]

			setAgeGroupReports(updatedReports)
		});
	});

	return (
		<Segment>
			<h3>Age group reports</h3>
			<div className="reports-container">
				{ageGroups.map(ageGroup => {
					const groupReports = ageGroupReports.filter(report => report.ageGroup === ageGroup);

					return <AgeGroupReport key={ageGroup} ageGroup={ageGroup} reports={groupReports}/>
				})}
			</div>
		</Segment>
	);
};
export default AgeGroupReports;

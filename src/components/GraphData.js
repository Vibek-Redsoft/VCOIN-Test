import React from "react";

import "./GraphData.scss";

import GraphBlock from "./GraphBlock";

import { getObjectFromAPI } from "../helpers/APIFormating";

import ArrayDefineMethod from "../helpers/Methods";

function GraphData(props) {
	const { currentUser: isAdmin, value, error } = props;

	const apiData = getObjectFromAPI(value, isAdmin);

	ArrayDefineMethod("insert");

	let prevDate, nextDate;

	const weekAfter2020 = (date) =>
		(parseInt(date.split("-")[0]) - 2020) * 52 + parseInt(date.split("-")[1]);

	const getWeekNumber = (d) => {
		// Copy date so don't modify original
		d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
		// Get first day of year
		var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		// Calculate full weeks to nearest Thursday
		var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
		// Return array of year and week number
		return weekAfter2020([d.getUTCFullYear(), weekNo].join("-"));
	};

	//sort dates
	apiData.graphs.map(
		(level) =>
			typeof level === "object" &&
			level.map((block) =>
				block.group !== "week"
					? !!block.value &&
					  block.value.sort((a, b) => {
							return new Date(a.Date) - new Date(b.Date);
					  })
					: !!block.value &&
					  block.value.sort((a, b) => {
							prevDate = weekAfter2020(a.Date);
							nextDate = weekAfter2020(b.Date);

							return prevDate - nextDate;
					  })
			)
	);

	function drawGraphs(data) {
		let difference;
		let assignedArray = [];

		let tomm;
		let dd;
		let mm;
		let yyyy;
		let increment;
		let target;
		// console.log(data);

		data?.forEach((block) => {
			assignedArray = block.value;
			if (
				block.title !== "VCOIN New Wallets" &&
				block.title !== "Monthly Active VCOIN wallets"
			) {
				assignedArray = [];
				block.value?.forEach((value, i) => {
					if (block.group === "week") {
						assignedArray.push(value);
						target =
							i + 1 < block.value.length
								? weekAfter2020(block.value[i + 1].Date)
								: getWeekNumber(new Date());

						difference = target - weekAfter2020(block.value[i].Date);
						increment = 1;

						if (difference > 1) {
							while (difference > 1) {
								assignedArray.push({
									Value: 0,
									Date: [
										block.value[i].Date.split("-")[0],
										parseInt(block.value[i].Date.split("-")[1]) + increment,
									].join("-"),
								});
								difference -= 1;
								increment += 1;
							}
						}
					} else {
						assignedArray.push(value);
						target =
							i + 1 < block.value.length
								? new Date(block.value[i + 1].Date)
								: new Date();
						difference = Math.ceil(
							(target - new Date(value.Date)) / (1000 * 60 * 60 * 24)
						);
						increment = 1;
						if (difference) {
							while (difference > 1) {
								tomm = new Date(
									new Date(value.Date).setDate(
										new Date(value.Date).getDate() + increment
									)
								);

								dd = String(tomm.getDate());
								mm = String(tomm.getMonth() + 1); //January is 0!
								yyyy = tomm.getFullYear();

								tomm = yyyy + "-" + mm + "-" + dd;

								assignedArray.push({ Value: 0, Date: tomm });
								difference -= 1;
								increment += 1;
							}
						}
					}
				});
			}
			block.value = assignedArray;
		});

		return data?.map(
			(block, i) =>
				block.value && (
					<GraphBlock
						key={i}
						graphTitle={block.title}
						graphPopup={block.popup}
						graphSets={block.value}
						groupType={block.group}
					/>
				)
		);
	}

	return apiData && !error ? (
		<section className="graph-data last">
			<div className="background-pattern">
				<picture>
					<source srcSet="images/section-graph-bg-1.webp" type="image/webp" />
					<img
						src="images/section-graph-bg-1.png"
						alt="background"
						className="pe-none bg-part-1"
					/>
				</picture>
				<picture>
					<source srcSet="images/section-graph-bg-2.webp" type="image/webp" />
					<img
						src="images/section-graph-bg-2.png"
						alt="background"
						className="pe-none bg-part-2"
					/>
				</picture>
				<picture>
					<source srcSet="images/section-graph-bg-3.webp" type="image/webp" />
					<img
						src="images/section-graph-bg-3.png"
						alt="background"
						className="pe-none bg-part-3"
					/>
				</picture>
			</div>
			<div className="container">
				<h3 className="underline-el light white">Historical Data for VCOIN</h3>
				<div className="graphs jc-sb bigger flex wrap">
					{drawGraphs(apiData.graphs[0])}
				</div>
				{isAdmin && (
					<div className="block">
						<h3 className="underline-el light admin">Admin Data</h3>
						<div className="graphs jc-sb bigger flex wrap">
							{drawGraphs(apiData.graphs[1])}
						</div>
					</div>
				)}
			</div>
		</section>
	) : null;
}

export default GraphData;

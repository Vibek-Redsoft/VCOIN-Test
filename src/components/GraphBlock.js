import React, { useEffect, useState } from "react";

import "./GraphBlock.scss";
import Chart from "react-apexcharts";
import InfoIcon from "./InfoIcon";

import { GetMonthName } from "../helpers/APIFormating";

// import millify from "millify"

// Add the titles of the graphs that do NOT need their data to be accumulated
const noAccumulation = {
	"Monthly Active VCOIN wallets": true,
};

function GraphBlock(props) {
	const [currentPage, setCurrentPage] = useState(0);
	const [pages, setPages] = useState();
	const [chart, setChart] = useState();
	const { graphSets, groupType, graphPopup, graphTitle } = props;

	let chartSettings;

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	let yyyy = today.getFullYear();

	today = yyyy + "-" + mm + "-" + dd;

	const formatNumber = (num) => {
		let format = +(Math.round(num + "e+2") + "e-2");

		return format;
	};

	useEffect(() => {
		let acc = 0;

		const accumulationMethod = (item) => ({
			Value: (acc += item.Value),
			Date: item.Date,
		});

		let aggregatedData = noAccumulation[graphTitle]
			? graphSets
			: graphSets.map(accumulationMethod);

		let collection = [];

		aggregatedData = aggregatedData.reverse();

		while (aggregatedData.length) {
			const slice = aggregatedData.splice(0, 14);

			collection.push(slice.reverse());
		}

		setPages(collection.reverse());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		chartSettings = !!pages && {
			series: [
				{
					name: props.graphTitle,
					// Y axis - array
					type: "line",
					data: pages[currentPage].map((dataPoint) =>
						formatNumber(dataPoint.Value)
					),
				},
			],
			options: {
				chart: {
					type: "line",
					height: "100%",
					fontFamily: "Gilroy, Arial, sans-serif",
					zoom: {
						enabled: false,
					},
					animations: {
						enabled: true,
						easing: "easeinout",
						speed: 700,
						animateGradually: {
							enabled: true,
							delay: 50,
						},
						dynamicAnimation: {
							enabled: true,
							speed: 350,
						},
						background: "#EDE9FF",
						foreColor: "#7D74A9",
						redrawOnWindowResize: true,
						redrawOnParentResize: true,
					},
				},
				grid: {
					show: true,
					borderColor: "#CEC2FF",
					strokeDashArray: 4,
					position: "back",
					xaxis: {
						lines: {
							show: true,
						},
					},
					yaxis: {
						lines: {
							show: true,
						},
					},
					padding: {
						top: 20,
						right: 10,
						bottom: 0,
						left: 15,
					},
				},
				stroke: {
					// show: true,
					curve: "smooth",
					colors: "#48EEC6",
					width: 3,
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					lines: {
						show: true,
					},
					crosshairs: {
						show: true,
						width: 1.5,
						position: "back",
						opacity: 0.6,
						fill: {
							type: "solid",
							color: "#48EEC6",
						},
						dropShadow: {
							enabled: false,
						},
					},
					labels: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
					labels: {
						formatter: function (value) {
							return Math.floor(+value);
						},
					},
				},
				// title: {
				//   text: props.graphTitle,
				//   align: 'left'
				// },
				fill: {
					gradient: {
						opacityFrom: 0.85,
						opacityTo: 0.85,
					},
					colors: "#48EEC6",
				},
				markers: {
					size: 3,
					colors: "#ECE8FF",
					strokeColors: "#48EEC6",
					strokeWidth: 1,
					shape: "circle",
					radius: 2,
					showNullDataPoints: true,
					hover: {
						size: undefined,
						sizeOffset: 0,
					},
				},
				// X axis array
				labels: pages[currentPage].map((dataPoint) => {
					let dateFormat = dataPoint.Date.split("-");

					let formatResult =
						groupType === "week"
							? "Week " + dateFormat[1] + ", " + dateFormat[0]
							: (dateFormat[2] ? " " + dateFormat[2] : "") +
							  " " +
							  GetMonthName[dateFormat[1] - 1] +
							  " " +
							  dateFormat[0];

					return formatResult;
				}),
			},
		};

		setChart(chartSettings);
	}, [pages, currentPage]);

	useEffect(() => {
		!!pages && setCurrentPage(pages.length - 1);
	}, [pages]);

	const handleClick = (direction) => {
		direction
			? //right
			  currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
			: //left
			  currentPage > 0 && setCurrentPage(currentPage - 1);
	};

	return chart ? (
		<div className="graph-block">
			<div style={{ display: "flex" }}>
				<h4 className="chart-title white">
					<strong className="relative">{graphTitle} </strong>
				</h4>
				<InfoIcon
					className={"info-icon graphBlockIcon"}
					text={graphPopup}
					color="white"
				/>
			</div>
			<div className="block-chart">
				<div className="menu flex ai-center">
					<div className="page-position">
						<p>
							<span className={currentPage === pages.length - 1 ? "end" : "b"}>
								{currentPage + 1} /
							</span>
							<span className="end">{pages.length}</span>
						</p>
					</div>
					<div className="controls">
						<div
							className={
								currentPage === pages.length - 1 ? "end right" : "right"
							}
							onClick={() => handleClick(1)}
						>
							<picture>
								<source srcSet="images/graph-arrow.svg" type="image/svg" />
								<img
									src="images/graph-arrow.png"
									role="button"
									alt="Go to previus page"
									className="ignore-global"
								/>
							</picture>
						</div>
						<div
							className={currentPage === 0 ? "end left" : "left"}
							onClick={() => handleClick(0)}
						>
							<picture>
								<source srcSet="images/graph-arrow.svf" type="image/svg" />
								<img
									src="images/graph-arrow.png"
									role="button"
									alt="Go to next page"
									className="ignore-global"
								/>
							</picture>
						</div>
					</div>
				</div>
				<Chart
					options={chart.options}
					series={chart.series}
					type="area"
					width="100%"
					height="100%"
				/>
			</div>
		</div>
	) : null;
}

export default GraphBlock;

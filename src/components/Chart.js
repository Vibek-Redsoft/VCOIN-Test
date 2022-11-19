import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import ButtonGroup from "@mui/material/ButtonGroup";

const useStyles = makeStyles({
	optionClicked: {
		"& MuiButton-root": {
			color: "white",
			backgroundColor: "#6740E6",
		},
	},
	optionNotClicked: {
		"& MuiButton-root": {
			color: "#6740E6",
			backgroundColor: "white",
		},
	},
});

function Chart({ data }) {
	const classes = useStyles();
	const [selection, setSelection] = React.useState();
	const [clicked, setClicked] = React.useState("oneMonth");
	const [dateFormat, setDateFormat] = React.useState("oneMonth");

	// const CustomButton = styled(Button)(({ theme }) => ({
	// 	backgroundColor: clicked === "oneMonth" ? "green" : "red",
	// 	...theme.typography.body2,
	// 	padding: theme.spacing(1),
	// 	textAlign: "center",
	// 	color: theme.palette.text.secondary,
	// }));

	const getDaysBetweenDates = (startDate, endDate, format) => {
		let now = startDate.clone();
		let dates = [];

		if (format === "oneWeek") {
			while (now.isSameOrBefore(endDate)) {
				dates.push(now.format("YYYY-MM-D"));
				now.add(1, "days");
			}
		} else {
			while (now.isSameOrBefore(endDate)) {
				dates.push(now.format("YYYY-MM-D"));
				now.add(1, "days");
			}
		}
		return dates;
	};

	const fillMissingDates = React.useCallback((data, format) => {
		let list = [];
		const now = moment();
		let startDate;
		if (format === "oneWeek") {
			startDate = moment().subtract(7, "days");
		} else if (format === "oneMonth") {
			startDate = moment().subtract(30, "days");
		} else if (format === "sixMonth") {
			startDate = moment().subtract(6, "months");
		}
		const dates = getDaysBetweenDates(startDate, now);

		if (format === "oneWeek") {
			dates.forEach((date) => {
				const found = data.findIndex((item) => {
					return (
						moment(item.Date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD") === date
					);
				});
				if (data[found]) {
					list.push(data[found]);
				} else {
					list.push({
						Value: 0,
						Date: moment(
							`${date} ${Math.floor(Math.random() * (23 - 1 + 1) + 1)}`,
							"YYYY-MM-DD H"
						).format("YYYY-MM-DD H"),
					});
				}
			});
		} else {
			dates.forEach((date) => {
				const found = data.findIndex((item) => item.Date === date);
				if (data[found]) {
					list.push(data[found]);
				} else {
					list.push({
						Value: 0,
						Date: date,
					});
				}
			});
		}
		return list.reverse();
	}, []);

	const changeGraphData = React.useCallback(
		(format) => {
			setClicked(format);
			setDateFormat(format);
			const timeFormatData = data[0][4][format];
			let dataWithAllDatesCleaned;

			if (format === "oneWeek" || format === "oneMonth") {
				dataWithAllDatesCleaned = fillMissingDates(timeFormatData, format);
			} else if (format === "sixMonth") {
				dataWithAllDatesCleaned = fillMissingDates(timeFormatData, format);
			} else {
				dataWithAllDatesCleaned = timeFormatData;
			}
			let value = dataWithAllDatesCleaned.map((i) => i.Value);
			value.reverse();

			let date;
			if (format === "oneYear") {
				date = dataWithAllDatesCleaned.map((i) => {
					return moment(i.Date, "YYYY-MM").format("MMM");
				});
			} else if (format === "oneMonth" || format === "sixMonth") {
				date = dataWithAllDatesCleaned.map((i) => {
					return moment(i.Date, "YYYY-MM-DD").format("MMM-DD");
				});
			} else if (format === "oneWeek") {
				date = dataWithAllDatesCleaned.map((i) => {
					return moment(i.Date, "YYYY-MM-DD H").format("MMM-DD hh:mm A");
				});
			} else {
				date = dataWithAllDatesCleaned.map((i) => {
					return moment(i.Date, "YYYY-MM-DD").format("YYYY-MM-DD");
				});
			}
			date.reverse();
			setSelection({ value, date });
		},
		[data, fillMissingDates]
	);

	React.useEffect(() => {
		changeGraphData("oneMonth");
	}, [changeGraphData]);

	const state = {
		series: [
			{
				name: "Transactions",
				data: selection?.value,
			},
		],
		options: {
			chart: {
				height: 350,
				type: "line",
				zoom: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				curve: "smooth",
				lineCap: "square",
				colors: undefined,
				width: 2,
				dashArray: 0,
			},
			grid: {
				row: {
					colors: ["#f3f3f3", "transparent"],
					opacity: 1,
				},
			},
			xaxis: {
				type: "category",
				tickAmount: dateFormat === "sixMonth" ? 30 : "dataPoints",
				tickPlacement: "on",
				categories: selection?.date,
				labels: {
					formatter: function (value, timestamp) {
						return value;
					},
				},
			},
			marker: {
				show: true,
			},
			tooltip: {
				// custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				// 	console.log(w.globals.labels);
				// 	return (
				// 		'<div class="arrow_box">' +
				// 		"<span>" +
				// 		w.globals.labels[dataPointIndex] +
				// 		": " +
				// 		series[seriesIndex][dataPointIndex] +
				// 		"</span>" +
				// 		"</div>"
				// 	);
				// },
				// x: {
				// 	show: false,
				// 	format: "dd MMM",
				// 	formatter: undefined,
				// },
				// y: {
				// 	formatter: function (
				// 		value,
				// 		{ series, seriesIndex, dataPointIndex, w }
				// 	) {
				// 		return value;
				// 	},
				// },
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 100],
				},
			},
		},
	};

	return (
		<Box>
			<Paper sx={{ display: "flex", flexDirection: "column" }}>
				<ButtonGroup
					variant="outlined"
					sx={{
						mx: "40px",
						my: "10px",
						justifyContent: "end",
					}}
				>
					<Button
						sx={
							clicked === "oneDay"
								? { backgroundColor: "#6740E6", color: "white" }
								: { backgroundColor: "white", color: "#6740E6" }
						}
						onClick={() => changeGraphData("oneDay")}
						className={
							clicked === "oneDay"
								? classes.optionClicked
								: classes.optionNotClicked
						}
					>
						1 Day
					</Button>
					<Button
						sx={
							clicked === "oneWeek"
								? { backgroundColor: "#6740E6", color: "white" }
								: { backgroundColor: "white", color: "#6740E6" }
						}
						onClick={() => changeGraphData("oneWeek")}
						className={
							clicked === "oneWeek"
								? classes.optionClicked
								: classes.optionNotClicked
						}
					>
						1 Week
					</Button>
					<Button
						sx={
							clicked === "oneMonth"
								? { backgroundColor: "#6740E6", color: "white" }
								: { backgroundColor: "white", color: "#6740E6" }
						}
						onClick={() => changeGraphData("oneMonth")}
						className={
							clicked === "oneMonth"
								? classes.optionClicked
								: classes.optionNotClicked
						}
					>
						1 Month
					</Button>
					<Button
						sx={
							clicked === "sixMonth"
								? { backgroundColor: "#6740E6", color: "white" }
								: { backgroundColor: "white", color: "#6740E6" }
						}
						onClick={() => changeGraphData("sixMonth")}
						className={
							clicked === "sixMonth"
								? classes.optionClicked
								: classes.optionNotClicked
						}
					>
						6 Months
					</Button>
					<Button
						sx={
							clicked === "oneYear"
								? { backgroundColor: "#6740E6", color: "white" }
								: { backgroundColor: "white", color: "#6740E6" }
						}
						onClick={() => changeGraphData("oneYear")}
						className={
							clicked === "oneYear"
								? classes.optionClicked
								: classes.optionNotClicked
						}
					>
						1 Year
					</Button>
				</ButtonGroup>
				{selection && (
					<ReactApexChart
						options={state.options}
						series={state.series}
						type="area"
						height={350}
					/>
				)}
			</Paper>
		</Box>
	);
}

export default Chart;

import React from "react";
import "./NumberData.scss";

import NumberBlock from "./NumberBlock";

import { getObjectFromAPI, thousandsSeparator } from "../helpers/APIFormating";

// import millify from 'millify';

function NumberData(props) {
	const { currentUser: isAdmin, value, isLoaded, error } = props;

	// const dateCreated = !!value && new Date(value.Data.CreatedDate).toString().split(' ')

	// const dateWithTimeZone = !!value && new Date(value.Data.CreatedDate);
	// const dateFormated = new Intl.DateTimeFormat("en-US", {
	// 	dateStyle: "medium",
	// 	timeStyle: "long",
	// }).format(dateWithTimeZone);

	const parseLatestTransactionTime = value
		? JSON.parse(value?.Data.Data).LatestTransactionTime
		: "";
	const dateLatestTransaction =
		!!parseLatestTransactionTime && new Date(parseLatestTransactionTime);
	const dateFormatedLatestTransaction = new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "long",
	}).format(dateLatestTransaction);

	// const dateFormated = isLoaded && `${dateCreated[2]}${parseInt(dateCreated[2]) !== 1 ? (parseInt(dateCreated[2]) !== 2 ? 'th' : 'nd') : 'st'}
	// of ${dateCreated[1]} ${dateCreated[3]} - ${dateCreated[4].split(':')[0]}:${dateCreated[4].split(':')[1]}`

	const apiData = value
		? getObjectFromAPI(value, isAdmin)
		: getObjectFromAPI(false);

	const formatNumber = (num) => {
		// num = +(Math.round(num + "e+2")  + "e-2")
		num = +Math.round(num);

		return thousandsSeparator(num.toString());
	};

	const Loader = <span className={`is-loading ${error && "error"}`}></span>;

	const renderTable = (admin) => {
		return apiData.numbers.map((row, nRow) =>
			row ? (
				<tr key={`table-row-${nRow}`}>
					{row.map((cell, nCell) => {
						if (admin) {
							return (
								cell.private && (
									<td key={`table-cell-${nCell}`}>
										<NumberBlock
											blockTitle={cell.title}
											// blockValue={isLoaded ? millify(cell.value) : Loader}
											blockValue={isLoaded ? formatNumber(cell.value) : Loader}
											popup={cell.popup}
											isLoaded={isLoaded}
											admin
										/>
									</td>
								)
							);
						} else {
							return (
								!cell.private && (
									<td key={`table-cell-${nCell}`}>
										<NumberBlock
											blockTitle={cell.title}
											// blockValue={isLoaded ? millify(cell.value) : Loader}
											blockValue={
												isLoaded
													? `${cell.prefix ? "$" : ""}${formatNumber(
															cell.value
													  )}`
													: Loader
											}
											popup={cell.popup}
											isLoaded={isLoaded}
										/>
									</td>
								)
							);
						}
					})}
				</tr>
			) : null
		);
	};

	return (
		<section className="number-data">
			<div className="container">
				<div className="vcoin-total">
					<div className="wrap-info flex jc-sb ai-end">
						<div className={`info ${error && "error"}`}>
							<h1>{apiData.title[0]}: </h1>
						</div>
						<div className="value">
							<div className={isLoaded ? "underline-el no-margin" : "ld-3"}>
								{/* <h2>{isLoaded ? millify(apiData.title[1]) : Loader}</h2> */}
								<h2>{isLoaded ? formatNumber(apiData.title[1]) : Loader}</h2>
							</div>
						</div>
					</div>
					{/* <p className="ld-1 default-p">
						Updated On: {isLoaded ? dateFormated : Loader}
					</p> */}
					<p className="ld-1 with-margin">
						Updated On: {isLoaded ? dateFormatedLatestTransaction : Loader}
					</p>
				</div>
				<div className="table-wrapper">
					<table className="data-content">
						<tbody>{renderTable()}</tbody>
					</table>
				</div>
				{isAdmin && (
					<div className="table-wrapper">
						<h3 className="underline-el light admin">Admin Data</h3>
						<table className="data-content admin">
							<tbody>{renderTable(true)}</tbody>
						</table>
					</div>
				)}
			</div>
		</section>
	);
}

export default NumberData;

import React from "react";
import "./InfoIcon.scss";
import "./NumberBlock.scss";
import InfoIcon from "./InfoIcon";
import Switch from "react-switch";

// import { thousandsSeparator } from "../helpers/APIFormating"

function NumberBlock(props) {
	const {
		isLoaded,
		popup,
		admin,
		key,
		cell,
		switchData,
		blockValue,
		blockTitle,
		checked,
		handleChange,
	} = props;
	let underlineClass = isLoaded ? "underline-el light def" : "light def ld-2 ";
	underlineClass += admin && " green";

	return (
		<>
			{!switchData ? (
				<div className="number-block">
					<div style={{ display: "flex" }}>
						<div className="title-info flex ai-center">
							<div className="title flex ai-baseline">
								<span className="relative">{blockTitle}</span>
								<InfoIcon
									text={cell.popup}
									key={key}
									color="#4000FF"
									className={"info-icon"}
								/>
							</div>
						</div>
					</div>
					<h3 className={underlineClass}>{blockValue}</h3>
				</div>
			) : (
				<div className="number-block">
					<div style={{ display: "flex" }}>
						<div className="title-info flex ai-center">
							<div className="title flex ai-baseline">
								<span className="relative">{blockTitle}</span>
								<InfoIcon
									text={popup}
									key={key}
									color="#4000FF"
									className={"info-icon"}
								/>
								<Switch
									height={15}
									width={35}
									onChange={handleChange}
									checked={checked}
								/>
							</div>
						</div>
					</div>
					<h3 className={underlineClass}>{blockValue}</h3>
				</div>
			)}
		</>
	);
}

export default NumberBlock;

import React from "react";

import "./NumberBlock.scss";
import "./InfoIcon.scss";
import InfoIcon from "./InfoIcon";

// import { thousandsSeparator } from "../helpers/APIFormating"

function NumberBlock(props) {
	const { isLoaded, blockTitle, popup, blockValue, admin, key } = props;

	let underlineClass = isLoaded ? "underline-el light def" : "light def ld-2 ";

	underlineClass += admin && " green";

	return (
		<div className="number-block">
			<div className="title-info flex ai-center">
				<div className="title flex ai-baseline">
					<span className="relative">
						{blockTitle}
						<InfoIcon
							className={"info-icon"}
							text={popup}
							key={key}
							color="#4000FF"
						/>
					</span>
				</div>
			</div>
			<h3 className={underlineClass}>{blockValue}</h3>
		</div>
	);
}

export default NumberBlock;

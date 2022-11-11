import React from "react";
import InfoIconLogo from "../images/icons8-info.svg";

function InfoIcon(props) {
	const { text, color, className } = props;

	return (
		<div className={className} data-text={text}>
			<img
				src={InfoIconLogo}
				alt="Info Logo"
				style={{ color: color, width: 20, height: 18 }}
			/>
		</div>
	);
}

export default InfoIcon;

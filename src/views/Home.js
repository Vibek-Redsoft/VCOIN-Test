import React, { useEffect } from "react";

import "./Home.scss";

import NumberData from "../components/NumberData";
import GraphData from "../components/GraphData";

function Home(props) {
	const { userToken, apiData, fetchingAPI, loading, error, userIsSuperAdmin } =
		props;

	const isLoaded = apiData && !fetchingAPI && !loading;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="home">
			<NumberData
				currentUser={isLoaded ? (userIsSuperAdmin ? userToken : false) : false}
				value={apiData.data}
				isLoaded={isLoaded}
				error={error}
			/>
			{isLoaded && (
				<GraphData
					currentUser={
						isLoaded ? (userIsSuperAdmin ? userToken : false) : false
					}
					value={isLoaded ? apiData.data : false}
					error={error}
				/>
			)}
		</div>
	);
}

export default Home;

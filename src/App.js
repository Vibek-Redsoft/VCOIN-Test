import React, { Suspense, useState, useEffect, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/Global.scss";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// import LazyPlacholder from './views/LazyPlacholder';
// import Home from './views/Home';
// import About from './views/About';
import Authentication from "./views/Authentication";

import consumeAPI from "./helpers/APIConsumer";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { auth } from "./firebase";

const LazyPrivacyPolicy = lazy(() => import("./views/PrivacyPolicy"));
const LazyNotFound = lazy(() => import("./views/NotFound"));
const LazyHome = lazy(() => import("./views/Home"));
const LazyAbout = lazy(() => import("./views/About"));
const LazyAuthForm = lazy(() => import("./components/AuthForm"));

// TODO: lazy load pages
function App() {
	// const [user, setUser] = useState('')
	const [userToken, setUserToken] = useState("");
	const bodyLock = document.querySelector("body");
	const [loading, setLoading] = useState(false);
	const [fetchingAPI, setFetchingAPI] = useState(false);
	const [apiData, setApiData] = useState("");
	const [error, setError] = useState(false);

	// restrict page view
	const [userIsSuperAdminGlobal, setUserIsSuperAdminGlobal] = useState(false);
	const [waitToComplete, setWaitToComplete] = useState(false);

	const [modalState, setModalState] = useState(false);

	function openModal() {
		setModalState(true);
		disableBodyScroll(bodyLock);
	}

	function closeModal() {
		setModalState(false);
		enableBodyScroll(bodyLock);
	}

	const handleLogin = async (email, password) => {
		const loggedUserData = await auth.signInWithEmailAndPassword(
			email,
			password
		);

		return loggedUserData;
	};

	const fetchAPI = async function (token, superAdmin) {
		let privileges = userIsSuperAdminGlobal
			? userIsSuperAdminGlobal
			: superAdmin;
		const result = await consumeAPI({
			token: token,
			userIsSuperAdmin: privileges,
		});

		result.apiResult && result.status === 200
			? setApiData(result.apiResult)
			: setError(true);

		setFetchingAPI(false);

		return result;
	};

	const handleSignOut = () => {
		setUserIsSuperAdminGlobal(0);

		auth
			.signOut()
			.then(function () {
				return;
			})
			.catch(function (error) {
				alert("An error occurred: ", error);
			});
	};

	useEffect(() => {
		setWaitToComplete(1);
		const onKeyUp = (e) => {
			if (e.key === "Escape") return closeModal();
		};

		const handleUserUpdate = async () => {
			const authData = await auth.onAuthStateChanged(async (user) => {
				setLoading(true);
				setFetchingAPI(true);

				setWaitToComplete(0);

				if (user) {
					const idTokenResult = await user.getIdTokenResult();
					let superAdmin = false;

					if (idTokenResult?.claims?.admin === true) {
						superAdmin = 1;
						setUserIsSuperAdminGlobal(1);
					}

					const tokenAPI = await user.getIdToken();

					setUserToken(tokenAPI);
					await fetchAPI(tokenAPI, superAdmin);
				} else {
					setUserToken("");
					await fetchAPI("");
				}

				setLoading(false);
			});

			return authData;
		};

		handleUserUpdate();
		document.body.addEventListener("keyup", onKeyUp, { passive: true });

		return () => {
			document.body.removeEventListener("keyup", onKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{!userToken ? (
				<Authentication loading={waitToComplete} login={handleLogin} />
			) : (
				<Router>
					<NavBar />
					<div className="content">
						<Suspense fallback={null}>
							<LazyAuthForm
								closeModal={closeModal}
								modalState={modalState}
								login={handleLogin}
							/>
							<Switch>
								<Route
									path="/"
									exact
									render={(props) => (
										<LazyHome
											{...props}
											userToken={userToken}
											userIsSuperAdmin={userIsSuperAdminGlobal}
											apiData={apiData}
											fetchingAPI={fetchingAPI}
											loading={loading}
											error={error}
										/>
									)}
								/>
								<Route path="/about" exact component={LazyAbout} />
								<Route
									path="/privacy-policy"
									exact
									component={LazyPrivacyPolicy}
								/>
								<Route component={LazyNotFound} />
							</Switch>
						</Suspense>
					</div>
					<Footer
						openModal={openModal}
						loading={loading}
						userToken={userToken}
						handleSignOut={handleSignOut}
					/>
				</Router>
			)}
		</>
	);
}

export default App;

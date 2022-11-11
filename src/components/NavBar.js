import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./NavBar.scss";

function NavBar() {
	const location = useLocation();

	return (
		<section className="nav-bar">
			<div className="container layout">
				<nav className="nav-bar">
					<div className="flex relative jc-sb pad-last ai-center">
						<div className="logo-container flex ai-center">
							<h1 className="ai-center jc-center flex">
								<NavLink to="/" exact>
									<img
										height="53"
										src="images/vcoin-logo.svg"
										alt="VCOIN Logo"
									/>
								</NavLink>
							</h1>
							<p className="underline-el light">
								An organized and audited view of VCOIN activity.
							</p>
						</div>
						<ul className="navigation-items ls-none td-none flex">
							<li>
								<NavLink
									exact
									to={location.pathname === "/about" ? "/" : "/about"}
								>
									About
								</NavLink>
							</li>
							<li>
								<a href="https://metajuice.com/vcoin/">VCOIN</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</section>
	);
}

export default NavBar;

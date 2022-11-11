import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./Footer.scss";

const isMobile = window.innerWidth <= 960;

function Footer(props) {
	const { userToken, loading } = props;
	const location = useLocation();

	return (
		<section className="footer">
			<div className="container layout flex jc-sb ai-center pad-last">
				<ul className="footer-links ls-none td-none flex">
					<li>
						<a href="https://metajuice.com/vcoin/">VCOIN</a>
					</li>
					<li>
						<NavLink to="/privacy-policy">Privacy &amp; Policy</NavLink>
					</li>
					<li>
						<NavLink exact to={location.pathname === "/about" ? "/" : "/about"}>
							About
						</NavLink>
					</li>
					{!loading ? (
						!userToken ? (
							<li>
								<button
									onClick={() => {
										props.openModal();
									}}
								>
									Admin
								</button>
							</li>
						) : (
							<li>
								<button
									onClick={() => {
										props.handleSignOut();
									}}
								>
									Sign Out
								</button>
							</li>
						)
					) : (
						<li className="flex jc-center ai-center">
							<span className="dot-pulse"></span>
						</li>
					)}
				</ul>
				<ul className="social-links ls-none td-none flex">
					<li>
						<a
							href="https://www.linkedin.com/company/vcoin"
							target={!isMobile ? "_blank" : "_self"}
							rel="noreferrer noopener"
						>
							<img src="images/linked-in.svg" alt="Linked In" />
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/thereal_vcoin"
							target={!isMobile ? "_blank" : "_self"}
							rel="noreferrer noopener"
						>
							<img src="images/twitter.svg" alt="Twitter" />
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}

export default Footer;

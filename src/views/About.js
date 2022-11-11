import React, { useEffect } from "react";

function About() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="about-section default-style last">
			<div className="container">
				<div className="heading-paragraph">
					<h1>About the VCOIN crypto token</h1>
					<p>
						<strong>VCOIN</strong> is a newly released crypto digital currency
						that enables peer to peer transactions and facilitates the massive
						virtual economy that is inside the gaming / virtual world of IMVU.
						VCOIN can also be taken out of the IMVU platform and moved into any
						compatible Ethereum wallet. VCOIN can be converted into fiat
						currency/cash via IMVU partner{" "}
						<a href="http://www.uphold.com">Uphold</a>
					</p>
					<p>
						The <strong>VCOIN</strong> ERC-20 token is powered by blockchain
						technology to create a secure ecosystem where VCOIN can be
						purchased, exchanged, traded or turned into cash. At the time of
						launch, the only place to purchase VCOIN is on the IMVU platform.
						Those interested in acquiring VCOIN should create an IMVU account
						and purchase VCOIN directly from IMVU. To learn more about VCOIN,
						visit <a href="https://metajuice.com/vcoin/">www.metajuice.com</a>
					</p>
				</div>
				<div className="heading-paragraph">
					<h2>
						What is the purpose of <span>VCOINstats.com</span>
					</h2>
					<p>
						This performance website was created to share VCOIN statistics,
						metrics and other information to communicate transparently with
						VCOIN users and the broader virtual world/market. This page provides
						a look inside the growth of the VCOIN token through a comprehensive
						dashboard.
					</p>
				</div>
				<div className="heading-paragraph">
					<h2>
						How accurate is the data at <span>VCOINstats.com</span>
					</h2>
					<p>
						All data presented on this page is pulled directly from the Uphold
						platform where the off-chain VCOIN transactions take place inside
						the IMVU ecosystem. In addition, the page will collect and present
						VCOIN activity happening on the public ethereum blockchain. All of
						this data is <strong>authenticated</strong> by LimeChain, a
						third-party blockchain development/services company.
					</p>
					<p>
						VCOINStats.com fetches data every 1 hour, analyzes the data for
						accuracy and presents via the states and graphs.
					</p>
				</div>
				<div className="heading-paragraph">
					<h2>The Data in details</h2>
					<ul className="dashed">
						<li>
							<strong>Total Number of VCOIN transacted:</strong> The sum of all
							VCOIN transactions
						</li>
						<li>
							<strong>Total Supply:</strong> All the VCOIN that have been minted
							(12.5B in the original mint)
						</li>
						<li>
							<strong>Circulating Supply:</strong> This is all the VCOIN ready
							to be sold and deployed, and all the VCOIN already in the market
						</li>
						<li>
							<strong>VCOIN in Market:</strong> The number of VCOINs that are in
							direct possession of users and token holders, excluding IMVU
						</li>
						<li>
							<strong>VCOIN Circulating Value:</strong> The circulating supply
							of VCOIN in US dollar value (1 VCOIN = $0.004)
						</li>
						<li>
							<strong>VCOIN Market Value:</strong> The value of all VCOINs in US
							dollars (1 VCOIN = $0.004)
						</li>
						<li>
							<strong>Total VCOIN Wallets:</strong> The total count of all
							wallets with VCOIN
						</li>
						<li>
							<strong>Peer to Peer Transacted VCOINs:</strong> The amount of
							VCOINs that have been transacted between users
						</li>
						<li>
							<strong>Days Since Launch:</strong> Days since the VCOIN token
							first launched on the IMVU platform
						</li>
					</ul>
				</div>
				<div className="heading-paragraph">
					<h2>How the graphs are drawn</h2>
					<p>
						All VCOIN data points are retrieved from the Uphold platform via
						API. They are aggregated into a daily metric, stored in a database,
						and then used to create the graphs shown.
					</p>
				</div>
				<p className="last-updated">Page last updated: December 1st, 2020</p>
				{/* <div className="heading-paragraph">
          <picture>
            <source srcSet="images/about-picture.webp" type="image/webp" />
            <img src="images/about-picture.png"  className="full" alt="Chart Example" type="image/png" />
          </picture>
        </div> */}
			</div>
		</section>
	);
}

export default About;

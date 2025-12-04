import React from "react";
import "./Footer.css";
import logoUrl from "../../img/yarningcircles_logo_transparent.png";

function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="site-footer" role="contentinfo">
			<div className="footer-inner">
				<div className="footer-brand">
					<a href="/" className="logo-link" aria-label="Go to Home">
						<img src={logoUrl} alt="Yarning Circles" className="footer-logo" />
					</a>
					<span className="tagline">Learn, build, and share.</span>
				</div>
				<div className="footer-meta">
					<div className="social">
						<a href="https://github.com/SheCodesAus" className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">GitHub</a>
						<a href="https://www.linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">LinkedIn</a>
					</div>
					<div className="legal">
						<a href="/privacy" className="footer-link">Privacy Terms</a>
					</div>
					<div className="copyright">© {year} Boolean Bears</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>JobFinder</strong>
          <p className="muted small">
            Jobs scraped and displayed with ❤️. Built for
            demo.
          </p>
        </div>

        <div className="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

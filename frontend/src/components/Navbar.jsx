import React from "react";

export default function Navbar({ query, setQuery }) {
  return (
    <header className="nav">
      <div className="nav-inner container">
        <div className="brand">JobFinder</div>

        <div className="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, tag or location"
            aria-label="Search jobs"
          />
        </div>

        <nav className="links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Post a job</a>
        </nav>
      </div>
    </header>
  );
}

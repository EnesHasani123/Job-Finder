import React from "react";

export default function Navbar({
  query,
  setQuery,
  source,
  setSource,
}) {
  const handleLink = (e, s) => {
    e.preventDefault();
    if (setSource) setSource(s);
  };

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
          <a
            href="#"
            onClick={(e) => handleLink(e, "duapune")}
            className={source === "duapune" ? "active" : ""}
          >
            Duapune
          </a>
          <a
            href="#"
            onClick={(e) => handleLink(e, "kosovajob")}
            className={
              source === "kosovajob" ? "active" : ""
            }
          >
            Kosovajob
          </a>
          <a href="#">About</a>
        </nav>
      </div>
    </header>
  );
}

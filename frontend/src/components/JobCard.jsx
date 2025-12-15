import React from "react";

function cleanTitle(t) {
  return t ? t.replace(/\n/g, " — ").trim() : "";
}

export default function JobCard({ job }) {
  const title = cleanTitle(job.title);
  return (
    <article className="card">
      <div className="card-top">
        <h3 className="job-title">{title}</h3>
        <div className="meta">
          <span className="tag">{job.tag}</span>
          <span className="location">{job.location}</span>
        </div>
      </div>

      <div className="card-body">
        <p className="muted small">
          Expires: {job.expire} • Date: {job.date}
        </p>
      </div>

      <div className="card-bottom">
        <a
          className="btn ghost"
          href={job.link}
          target="_blank"
          rel="noreferrer"
        >
          Employer
        </a>
        <a
          className="btn primary"
          href={job.apply}
          target="_blank"
          rel="noreferrer"
        >
          Apply
        </a>
      </div>
    </article>
  );
}

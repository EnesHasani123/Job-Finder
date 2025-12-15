import React from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="center muted">No jobs found.</div>
    );
  }

  return (
    <div className="grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

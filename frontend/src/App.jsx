import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";
import Footer from "./components/Footer";

const SAMPLE = [
  {
    id: 151,
    title:
      "Drejtoreshe Poste\n            Mail Boxes Etc. Albania",
    company: "",
    location: "Tirane",
    tag: "Drejtor Dege",
    date: "09-01-2026",
    expire: "edhe 25 ditë",
    apply:
      "https://duapune.com/jobs/109647-drejtoreshe-poste",
    link: "https://duapune.com/employers/mail-boxes-etc-albania",
    source: "duapune",
  },
  {
    id: 148,
    title: "Ndihmes Kuzhinier\nQuick Bite",
    company: "",
    location: "Tirane",
    tag: "Kuzhinier",
    date: "06-01-2026",
    expire: "edhe 22 ditë",
    apply:
      "https://duapune.com/jobs/109550-ndihmes-kuzhinier",
    link: "https://duapune.com/employers/quick-bite",
    source: "duapune",
  },
  {
    id: 147,
    title: "Agjent/e Shitjesh Part Time\nThe Glam House",
    company: "",
    location: "Tirane",
    tag: "Agjent Shitjesh Horeca",
    date: "06-01-2026",
    expire: "edhe 22 ditë",
    apply:
      "https://duapune.com/jobs/109554-agjent-e-shitjesh-part-time",
    link: "https://duapune.com/employers/the-glam-house",
    source: "duapune",
  },
  {
    id: 146,
    title: "Menaxher Produkti\nAbissnet Sh.A.",
    company: "",
    location: "Tirane",
    tag: "Specialist Marketingu",
    date: "06-01-2026",
    expire: "edhe 22 ditë",
    apply:
      "https://duapune.com/jobs/109534-menaxher-produkti",
    link: "https://duapune.com/employers/abissnet-sh-a",
    source: "duapune",
  },
];

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  // source controls which site's jobs we show (e.g. 'duapune' or 'kosovajob')
  const [source, setSource] = useState("duapune");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        // build URL with source filter
        const params = new URLSearchParams();
        if (source) params.set("source", source);
        const url = `/api/jobs${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        const res = await fetch(url);
        if (!res.ok)
          throw new Error("Network response not ok");
        const data = await res.json();
        if (!cancelled) setJobs(data);
      } catch (err) {
        // fallback to sample data if API fails
        console.warn(
          "Failed to fetch /api/jobs, using sample data:",
          err.message
        );
        if (!cancelled)
          setJobs(
            SAMPLE.map((s) => ({
              ...s,
              source: s.source || "duapune",
            }))
          );
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => (cancelled = true);
  }, [source]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((j) => {
      const fields = [j.title, j.tag, j.location, j.company]
        .join(" ")
        .toLowerCase();
      return fields.includes(q);
    });
  }, [jobs, query]);

  return (
    <div className="app-root">
      <Navbar
        query={query}
        setQuery={setQuery}
        source={source}
        setSource={setSource}
      />

      <main className="container">
        <section className="hero">
          <h1>Latest jobs</h1>
          <p className="muted">
            Browse jobs scraped from the site. Click a job
            to apply or visit the employer.
          </p>
        </section>

        {loading ? (
          <div className="center">Loading jobs…</div>
        ) : (
          <JobList jobs={visible} />
        )}

        {error && (
          <div className="notice">
            API error, showing cached sample results.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

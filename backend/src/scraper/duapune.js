import { chromium } from "playwright";
import { db } from "../db/index.js";

export async function scrapeDuapune() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://duapune.com", {
    waitUntil: "networkidle",
  });

  const jobs = await page.$$eval(".job-listing", (items) =>
    items.map((job) => ({
      title:
        job.querySelector(".job-title")?.innerText.trim() ||
        "",
      link: job.querySelector("a")?.href || "",
      company:
        job
          .querySelector(".mid-content > a")
          ?.innerText.trim() || "",
      tag:
        job
          .querySelector(".main-jobs-tag")
          ?.innerText.trim() || "",
      location:
        job
          .querySelector(".job-details a")
          ?.innerText.trim() || "",
      date:
        job.querySelector(".time")?.innerText.trim() || "",
      expire:
        job.querySelector(".expire")?.innerText.trim() ||
        "",
      apply: job.querySelector(".apply-job")?.href || "",
      // mark the source so we can filter by origin
      source: "duapune",
    }))
  );

  await browser.close();
  return jobs;
}

export async function saveJobsToDB(jobs) {
  for (const j of jobs) {
    try {
      await db.query(
        `INSERT INTO jobs (title, company, location, tag, source, date, expire, apply, link)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (link) DO NOTHING`,
        [
          j.title,
          j.company,
          j.location,
          j.tag,
          j.source || "duapune",
          j.date,
          j.expire,
          j.apply,
          j.link,
        ]
      );
    } catch (err) {
      console.error(err);
    }
  }
}

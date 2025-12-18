import { chromium } from "playwright";
import { db } from "../db/index.js";

export async function scrapeKosovaJob() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://kosovajob.com", {
    waitUntil: "networkidle",
  });

  const jobs = await page.$$eval(".jobListCnts", (items) =>
    items
      .map((item) => {
        const inner = item.querySelector(
          ".jobListCntsInner"
        );
        const linkEl = item.querySelector("a");

        if (!inner || !linkEl) return null;

        return {
          title:
            inner
              .querySelector(".jobListTitle")
              ?.innerText.trim() || "",
          location:
            inner
              .querySelector(".jobListCity")
              ?.innerText.trim() || "",
          expire:
            inner
              .querySelector(".jobListExpires")
              ?.innerText.trim() || "",
          link: linkEl.href,
          company: "KosovaJob",
          tag: "",
          date: "",
          apply: linkEl.href,
        };
      })
      .filter(Boolean)
  );

  await browser.close();
  return jobs;
}

export async function saveKosovaJobsToDB(jobs) {
  for (const j of jobs) {
    try {
      await db.query(
        `
        INSERT INTO jobs (title, company, location, tag, date, expire, apply, link)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (link) DO NOTHING
        `,
        [
          j.title,
          j.company,
          j.location,
          j.tag,
          j.date,
          j.expire,
          j.apply,
          j.link,
        ]
      );
    } catch (err) {
      console.error("KosovaJob insert error:", err.message);
    }
  }
}

import { scrapeDuapune, saveJobsToDB } from "./duapune.js";
import {
  scrapeKosovaJob,
  saveKosovaJobsToDB,
} from "./kosovajob.js";

async function runScrapers() {
  console.log("Starting job scrapers...\n");

  // ---------------- DUAPUNE ----------------
  try {
    console.log("Running Duapune scraper...");
    const duapuneJobs = await scrapeDuapune();
    console.log(
      `Scraped ${duapuneJobs.length} jobs from Duapune`
    );

    if (duapuneJobs.length > 0) {
      await saveJobsToDB(duapuneJobs);
      console.log("Duapune jobs saved to database\n");
    } else {
      console.log(
        "No Duapune jobs found. Check selectors.\n"
      );
    }
  } catch (err) {
    console.error(
      "Duapune scraper failed:",
      err.message,
      "\n"
    );
  }

  // ---------------- KOSOVAJOB ----------------
  try {
    console.log("Running KosovaJob scraper...");
    const kosovaJobs = await scrapeKosovaJob();
    console.log(
      `Scraped ${kosovaJobs.length} jobs from KosovaJob`
    );

    if (kosovaJobs.length > 0) {
      await saveKosovaJobsToDB(kosovaJobs);
      console.log("KosovaJob jobs saved to database\n");
    } else {
      console.log(
        "No KosovaJob jobs found. Check selectors.\n"
      );
    }
  } catch (err) {
    console.error(
      "KosovaJob scraper failed:",
      err.message,
      "\n"
    );
  }

  console.log("All scrapers finished.");
}

runScrapers()
  .then(() => {
    console.log("Scraper process completed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Fatal scraper error:", err);
    process.exit(1);
  });

import { scrapeDuapune, saveJobsToDB } from "./duapune.js";

async function runScrapers() {
  console.log("Starting scraper...");

  const jobs = await scrapeDuapune();
  console.log(`Scraped ${jobs.length} jobs from Duapune`);

  if (jobs.length === 0) {
    console.log("No jobs scraped. Check selectors.");
    return;
  }

  await saveJobsToDB(jobs);
  console.log("Jobs saved to database");
}

runScrapers()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

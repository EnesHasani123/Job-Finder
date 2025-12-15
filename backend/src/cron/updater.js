import cron from "node-cron";
import {
  scrapeDuapune,
  saveJobsToDB,
} from "../scraper/duapune.js";

cron.schedule("*/30 * * * *", async () => {
  console.log("Running scraper...");
  const jobs = await scrapeDuapune();
  await saveJobsToDB(jobs);
  console.log("Inserted jobs:", jobs.length);
});

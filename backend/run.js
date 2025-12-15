import { scrapeDuapune } from "./scraper.js";

async function test() {
  const jobs = await scrapeDuapune();
  console.log(jobs);
}

test();

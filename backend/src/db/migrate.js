import { db } from "./index.js";

async function migrate() {
  try {
    await db.query(
      `ALTER TABLE jobs ADD COLUMN IF NOT EXISTS source TEXT;`
    );
    console.log(
      "Migration complete: ensured jobs.source column exists"
    );
  } catch (err) {
    console.error("Migration failed", err);
    process.exit(1);
  } finally {
    await db.end();
    process.exit(0);
  }
}

migrate();

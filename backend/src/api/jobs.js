import express from "express";
import { db } from "../db/index.js";

export const jobsRouter = express.Router();

jobsRouter.get("/", async (req, res) => {
  const { search } = req.query;

  try {
    if (search) {
      const result = await db.query(
        `SELECT * FROM jobs WHERE title ILIKE $1 OR company ILIKE $1 ORDER BY id DESC`,
        [`%${search}%`]
      );
      return res.json(result.rows);
    }

    const result = await db.query(
      "SELECT * FROM jobs ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

import express from "express";
import cors from "cors";
import "./cron/updater.js";
import { jobsRouter } from "./api/jobs.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRouter);

app.listen(4000, () =>
  console.log("Server running on http://localhost:4000")
);

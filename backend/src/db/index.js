import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  user: "eneshasani",
  host: "localhost",
  database: "jobfinder",
  password: "",
  port: 5432,
});

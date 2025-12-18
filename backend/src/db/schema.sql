CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  company TEXT,
  location TEXT,
  tag TEXT,
  source TEXT,
  date TEXT,
  expire TEXT,
  apply TEXT,
  link TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

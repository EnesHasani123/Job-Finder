# Job Finder — Frontend

This is a small React + Vite frontend that fetches job data from the backend API (`/api/jobs`) and displays them as cards with a navbar and footer.

Quick start

1. Install dependencies

```bash
cd frontend
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open the URL printed by Vite (usually http://localhost:5173). The app fetches `/api/jobs`. If your backend is on a different host/port, either run the backend on the same host or configure a proxy.

Notes

- If the frontend cannot reach `/api/jobs`, it falls back to sample data included in the app for demo purposes.
- This is intentionally minimal: you can extend it with pagination, filters, or a design system.

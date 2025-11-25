# Job Scheduler Frontend

A lightweight React + Vite frontend for the Job Scheduler Automation System. This repository provides a responsive UI built with Tailwind CSS to create, view and manage scheduled jobs. It is designed to pair with a backend API (see `src/api.js`) that exposes job endpoints under `/api`.

**Tech stack:**

- React (JSX)
- Vite
- Tailwind CSS
- Axios (API client)

**Key features**

- Create jobs with a JSON payload, priority and task name.
- Live JSON validation, pretty-format, preview and copy payload UX in `CreateJob`.
- Responsive layout and accessible form controls.
- Small, focused API wrapper in `src/api.js`.

**Quickstart (development)**

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Start the dev server:

   ```powershell
   npm run dev
   ```

3. Open the URL printed by Vite (usually `http://localhost:5173`).

**Build for production**

```powershell
npm run build
npm run preview
```

**Environment / API base URL**
The frontend reads the backend URL from the `VITE_API_URL` environment variable. Create a `.env` file in the project root or set the env var when running:

```powershell
$env:VITE_API_URL = 'https://your-backend.example.com/api'
npm run dev
```

If `VITE_API_URL` is not set the client falls back to `http://localhost:5000/api` (see `src/api.js`).

**Important files**

- `index.html`, `vite.config.js` — Vite configuration and entry.
- `src/main.jsx` — React entry and app mounting.
- `src/App.jsx` — Application routes and layout.
- `src/api.js` — Axios instance and API helpers (createJob, listJobs, getJob, runJob).
- `src/pages/CreateJob.jsx` — Job creation form with enhanced UX (JSON validation, format, preview, copy).
- `src/pages/Dashboard.jsx`, `src/pages/JobDetail.jsx` — other app pages.

**Create Job UX notes**

- The Create Job form validates the payload on change and prevents submission if JSON is invalid.
- Use the **Format JSON** button to pretty-print the payload before submitting.
- The **Show Preview** toggle displays a read-only preview of the JSON payload.
- The **Copy Payload** button copies the current payload to the clipboard for easy sharing.

**Contributing**

- Feel free to open PRs for UX improvements, bug fixes, or accessibility enhancements.
- Keep changes small and focused. Run the dev server to verify behavior locally.

**License**
This project has no license defined in the repo. Add a `LICENSE` file or update this section as appropriate.

---

If you want I can also add a `CONTRIBUTING.md`, prettier/tailwind config, or update the project README with screenshots — tell me which you'd prefer next.

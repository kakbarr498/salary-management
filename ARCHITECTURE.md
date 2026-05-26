# Architecture & Design

Overview
- Backend: Node.js + TypeScript + Express serving a small REST API backed by SQLite (better-sqlite3) for simplicity and zero-ops local development.
- Frontend: React + TypeScript components with small, testable units. No heavy framework required for this assessment.

Data model
- employees: id, first_name, last_name, job_title, country, salary, email

Key APIs
- POST /api/employees — create
- GET /api/employees?limit&offset — list (supports pagination)
- GET /api/employees/:id — read
- PUT /api/employees/:id — update
- DELETE /api/employees/:id — delete
- GET /api/insights/country/:country — min/max/avg (+count, median)
- GET /api/insights/job/:title/country/:country — average for job title in a country

Design choices & trade-offs
- SQLite via better-sqlite3: easy to seed and fast for local workloads; synchronous API simplifies scripts and tests. For production or concurrent write-heavy workloads, choose Postgres.
- Server-side sync I/O (better-sqlite3) keeps seed performance high; seed batches are inserted inside transactions for speed.
- Tests: Jest + Supertest for backend; React Testing Library for frontend. Kept tests small and deterministic.
- Frontend: simple React components and small pagination controls; for very large UIs consider react-window or similar virtualization.

Seeding & performance
- The seed script inserts rows in batches (default 1000) inside a transaction for performance. In local tests the 10k seed completed quickly using the bundled approach (see README for commands). If you run a larger seed frequently, consider using a compiled script or native binary for max throughput.

How to run locally (server)
```bash
cd server
npm install
# run tests
npm test
# seed 10k (example)
npx ts-node --transpile-only src/seed.ts
```

How to run frontend tests
```bash
cd client
npm install
npm test
```

Demo script (manual)
1) Start server: `cd server && npm run dev` (uses ts-node)
2) Use the client tests or open a simple static host for `client/src` (this assessment includes unit tests and components; for a full SPA you can add a bundler)

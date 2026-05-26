# Salary Management

Monorepo with `server/` (Node+TypeScript+Express+SQLite) and `client/` (React+TypeScript).

Run client tests:

```bash
cd client
npm install
npm test
```

Run server tests and seed:

```bash
cd server
npm install
npm test
# seed 10000 (may take a bit)
node -e "require('./dist/seed').default(10000)"
```

CI: see `.github/workflows/ci.yml`.

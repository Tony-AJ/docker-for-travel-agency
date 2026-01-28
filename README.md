# Odoo-Travel-agency-backend

This repository contains the backend for the Odoo Travel Agency project. It uses Node.js (ESM), Express, and Prisma (v7) with PostgreSQL.

This README documents the current project setup, what changes were made while troubleshooting, and step-by-step instructions to get the project running locally.

---

## What was changed (summary)
- Migrated Prisma schema to Prisma v7 expectations:
	- Removed `url` from `prisma/schema.prisma` (datasource URL is loaded from `prisma.config.ts`).
	- Set Prisma generator provider to `prisma-client-js` and generator output to `./node_modules/.prisma/client` so Prisma emits the JS runtime files where `@prisma/client` expects them.
	- Ran `npx prisma generate` to create the client runtime.
- Resolved Prisma runtime errors in the application entry:
	- Ensured the generated client is importable by `@prisma/client`.
	- When required by Prisma v7, constructed and passed a Postgres adapter (`@prisma/adapter-pg`) into `PrismaClient`.
- Fixed ESM/CommonJS interop for dependencies:
	- Replaced default imports for `jsonwebtoken` with namespace imports (`import * as jwt from 'jsonwebtoken'`).
	- Used `bcryptjs` (pure JS) in `services/auth.service.js` to avoid native build/toolchain issues.
- Fixed case-sensitive import paths (Linux): updated `app.js` to import routes from the actual `Routes` folder or recommended renaming the folder to lowercase `routes`.

These edits were made to get the server to import the generated Prisma client and for dependencies to resolve under ESM.

---

## Prerequisites
- Node.js 18+ (tested with Node.js v20)
- npm
- Docker (recommended) OR a local PostgreSQL server

If your system cannot install system packages via `apt` (common on minimal containers), Docker is the simplest way to run a local Postgres instance.

---

## Environment
Create a `.env` file in the project root with at least the following:

```env
DATABASE_URL="postgresql://postgres:postpassword@localhost:4466/odoodb?schema=public"
JWT_SECRET=your_jwt_secret_here
```

The project loads environment variables in `prisma.config.ts` using `import "dotenv/config";`.

---

## Start PostgreSQL (recommended: Docker)

Run a Postgres container mapped to host port `4466` (matching the example `DATABASE_URL` above):

```bash
docker run --name odoodb \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=postpassword \
	-e POSTGRES_DB=odoodb \
	-p 4466:5432 \
	-v odoodb-data:/var/lib/postgresql/data \
	-d postgres:15
```

Verify connectivity:

```bash
docker ps --filter name=odoodb
psql "postgresql://postgres:postpassword@localhost:4466/odoodb"
```

If you prefer system Postgres, install it via your package manager and either reconfigure it to listen on port `4466` or update `DATABASE_URL` to the port Postgres uses (usually `5432`).

---

## Install dependencies

From the project root:

```bash
npm install
```

Extra packages installed/needed during troubleshooting:

```bash
npm install @prisma/adapter-pg bcryptjs jsonwebtoken
npm install --save-dev prisma
```

Notes:
- `bcryptjs` is used to avoid native compilation issues. If you want the native `bcrypt`, you may need system build tools (`build-essential`, `python3`, `libssl-dev`).

---

## Prisma: generate client and run migrations

Generate the client:

```bash
npx prisma generate
```

Run migrations (apply DB migrations and create the `_prisma_migrations` if needed):

```bash
npx prisma migrate dev --name initial
```

If you see an error complaining about `url` in `schema.prisma`, remove `url = env("DATABASE_URL")` from `prisma/schema.prisma` and ensure `prisma.config.ts` exposes `DATABASE_URL`.

---

## Run the app

Start the server in development mode (nodemon):

```bash
npm run dev
```

With nodemon running, type `rs` in the terminal to restart after code changes.

If you see a Prisma constructor error like:

```
PrismaClientConstructorValidationError: Using engine type "client" requires either "adapter" or "accelerateUrl"
```

Make sure the Prisma client is instantiated with an adapter, for example:

```js
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
```

---

## Common troubleshooting
- Module not found (e.g. `bcrypt`, `jsonwebtoken`): run `npm install <package>`.
- ESM/CommonJS import errors: prefer `import * as jwt from 'jsonwebtoken'` for `jsonwebtoken`, and use `bcryptjs` if native `bcrypt` fails to build.
- `Cannot find module '.prisma/client/default'`: run `npx prisma generate` and ensure the generator output points to `node_modules/.prisma/client` or update your imports to use the custom generated path.
- Database connection errors (Prisma P1001): ensure the Postgres server is running and reachable at the `DATABASE_URL` host/port.

---

## Files touched while troubleshooting
- `prisma/schema.prisma`
- `prisma.config.ts` (already present; used to load `.env`)
- `index.js` / server entry (Prisma client import and adapter usage)
- `utils/jwt.js` and `middlewares/auth.middleware.js` (JWT import style)
- `services/auth.service.js` (bcryptjs usage)
- `app.js` (route import case fix)

---

If you'd like, I can:
- Start a local Postgres Docker container and run migrations for you.
- Run the server and paste the startup logs.
- Rename the `Routes` folder to `routes` and update imports (conventional naming).

Tell me which follow-up action you want and I'll proceed.


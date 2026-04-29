# 🐱 Gatinhos do Parque v2

A production-ready Turborepo monorepo for a cat shelter management platform — enabling adoption tracking, shelter administration, and a public-facing cat showcase.

---

## 🗂️ Project Structure

```
gatinhosdoparquev2/
├── apps/
│   ├── api/          # NestJS backend (REST API + Swagger)
│   └── web/          # React + Vite frontend (SPA)
├── packages/
│   ├── database/     # Prisma ORM schema, client & seed script
│   ├── eslint-config/ # Shared ESLint flat config
│   ├── typescript-config/ # Shared tsconfig presets
│   └── types/        # Shared DTOs and interfaces
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline (lint → build → deploy)
├── docker-compose.yml      # Production stack
├── docker-compose.dev.yml  # Local DB only
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | [Turborepo](https://turbo.build/) + [pnpm workspaces](https://pnpm.io/workspaces) |
| Backend | [NestJS](https://nestjs.com/) + TypeScript |
| Frontend | [React](https://react.dev/) + [Vite](https://vitejs.dev/) + TypeScript |
| Database | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/) |
| Auth | JWT via `@nestjs/jwt` + `passport-jwt` |
| CI/CD | [GitHub Actions](https://github.com/features/actions) → Docker → VPS SSH |
| Containerization | Multi-stage Dockerfiles + Docker Compose |

---

## ⚡ Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Docker & Docker Compose

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 3. Start the database (Docker)

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Run migrations and seed

```bash
pnpm db:migrate
pnpm db:seed
```

### 5. Start development servers

```bash
pnpm dev
```

- API: http://localhost:3001
- Swagger docs: http://localhost:3001/api/docs
- Web: http://localhost:5173

---

## 🐳 Docker (Full Stack)

Build and run the entire stack with Docker Compose:

```bash
docker compose up --build -d
```

- Web: http://localhost
- API: http://localhost:3001

---

## 🌱 Seed Data

The seed script creates realistic mock data:

| Type | Count | Details |
|------|-------|---------|
| Users | 5 | 1 admin, 1 volunteer, 3 adopters |
| Cats | 9 | 6 available, 1 reserved, 1 adopted, 1 in treatment |
| Adoptions | 3 | 1 completed, 1 pending, 1 approved |

**Admin credentials (after seed):**
```
Email:    admin@gatinhosdoparque.org
Password: password123
```

---

## 🔒 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/auth/login` | Public | Authenticate |
| GET | `/v1/cats` | Public | List cats (paginated + filters) |
| GET | `/v1/cats/:id` | Public | Get cat details |
| POST | `/v1/cats` | Admin/Volunteer | Create cat |
| PUT | `/v1/cats/:id` | Admin/Volunteer | Update cat |
| DELETE | `/v1/cats/:id` | Admin | Delete cat |
| GET | `/v1/adoptions` | Admin/Volunteer | List adoptions |
| POST | `/v1/adoptions` | Authenticated | Request adoption |
| PUT | `/v1/adoptions/:id` | Admin/Volunteer | Update adoption status |
| GET | `/v1/users` | Admin | List users |
| POST | `/v1/users` | Public | Register user |

Full interactive docs at `/api/docs` (Swagger UI).

---

## 🤖 CI/CD

On push to `main`:

1. **Lint & Typecheck** — validates all packages
2. **Build & Push** — builds multi-stage Docker images, pushes to GHCR
3. **Deploy** — SSHes into VPS, pulls images, runs `docker compose up -d`, runs migrations

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | VPS IP or hostname |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key |
| `VPS_PORT` | SSH port (default: 22) |
| `JWT_SECRET` | Production JWT secret |
| `DATABASE_URL` | PostgreSQL connection string |
| `VITE_API_URL` | Production API URL |

---

## 📦 Useful Commands

```bash
# Development
pnpm dev                  # Start all apps in watch mode
pnpm build                # Build all apps
pnpm lint                 # Lint all packages
pnpm typecheck            # Typecheck all packages

# Database
pnpm db:generate          # Generate Prisma client
pnpm db:migrate           # Run migrations (production)
pnpm --filter @repo/database db:migrate:dev  # Create new migration
pnpm db:seed              # Seed database
pnpm --filter @repo/database db:studio       # Open Prisma Studio

# Docker
docker compose -f docker-compose.dev.yml up -d  # Start dev DB only
docker compose up --build -d                     # Full production stack
```

# ─── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy workspace config files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc ./
COPY packages/typescript-config ./packages/typescript-config
COPY packages/eslint-config ./packages/eslint-config
COPY packages/types/package.json ./packages/types/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/typescript-config ./packages/typescript-config
COPY --from=deps /app/packages/eslint-config ./packages/eslint-config

# Copy source
COPY packages/types ./packages/types
COPY packages/database ./packages/database
COPY apps/api ./apps/api
COPY package.json pnpm-workspace.yaml turbo.json .npmrc ./

# Generate Prisma client
RUN pnpm --filter @repo/database db:generate

# Build the API
RUN pnpm --filter @repo/api build

# ─── Stage 3: Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm for production installs
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc ./
COPY packages/typescript-config ./packages/typescript-config
COPY packages/types/package.json ./packages/types/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY apps/api/package.json ./apps/api/package.json

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built output
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm

# Copy generated prisma client
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3001

WORKDIR /app/apps/api

CMD ["node", "dist/main"]

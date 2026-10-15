# ---- Runtime image (single stage: all deps are needed to build & run) ----
FROM node:20-slim

WORKDIR /app

# OpenSSL is required by Prisma; python3/make/g++ for native deps (bcrypt).
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma client is gitignored, so it must be generated at build time.
# A dummy URL is enough here (generate does not connect to the database).
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public" npx prisma generate

ENV NODE_ENV=production
EXPOSE 5001

# Apply pending migrations, then start the server (tsx runs the ESM TypeScript).
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/index.ts"]

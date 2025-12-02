# Stage 1: Builder
FROM node:25-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (no npm)
FROM node:25-alpine

WORKDIR /app
COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci --omit=dev \
  && rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]

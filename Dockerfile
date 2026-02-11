# Build stage
FROM node:lts-alpine AS build

# pnpmのインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# 出力用のステージ
FROM alpine:latest
COPY --from=build /app/dist /dist
CMD ["/bin/sh"]

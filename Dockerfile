# Build stage
FROM node:lts-alpine AS build

# Astro ビルド時に commit.ts が git を叩くため
RUN apk add --no-cache git

# pnpmのインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG GIT_COMMIT=
ENV PUBLIC_GIT_COMMIT=${GIT_COMMIT}
RUN pnpm run build

# 出力用のステージ
FROM alpine:latest AS dist

# ホストの nginx が配信する dist ディレクトリへコピーするために、ビルド成果物だけを取り出す
COPY --from=build /app/dist /dist

CMD ["/bin/sh"]

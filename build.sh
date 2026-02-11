#!/bin/bash

# エラーが発生したら停止
set -e

IMAGE_NAME="whoami-builder"
CONTAINER_NAME="whoami-temp"
DIST_DIR="./dist"

echo "🚀 Building Docker image..."
docker build -t $IMAGE_NAME .

echo "📂 Extracting build artifacts..."
# 既存のdistをクリーンアップ（必要に応じて）
if [ -d "$DIST_DIR" ]; then
    rm -rf "$DIST_DIR"
fi

# 一時コンテナを作成してファイルをコピー
# scratchイメージには実行コマンドがないため、docker create で十分
docker create --name $CONTAINER_NAME $IMAGE_NAME
docker cp $CONTAINER_NAME:/dist/. "$DIST_DIR"
docker rm $CONTAINER_NAME

echo "✅ Build complete! Artifacts are in $DIST_DIR"

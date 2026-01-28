#!/bin/bash
# Cloudflare Pages 部署脚本
echo "开始部署到Cloudflare Pages..."
npm run build
echo "构建完成，文件已准备就绪"
echo "部署路径: $(pwd)/dist"
ls -la dist/
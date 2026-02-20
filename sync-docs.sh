#!/bin/bash

# 同步脚本：将 plan-X 目录下的文档同步到 docs/plan-X/
# 使用方法：./sync-docs.sh

echo "🔄 正在同步文档..."

# 同步 plan-1
if [ -d "plan-1" ]; then
    echo "📁 同步 plan-1..."
    mkdir -p docs/plan-1
    cp plan-1/*.md docs/plan-1/ 2>/dev/null || true
    echo "✅ plan-1 同步完成"
fi

# 同步 plan-2（如果存在）
if [ -d "plan-2" ]; then
    echo "📁 同步 plan-2..."
    mkdir -p docs/plan-2
    cp plan-2/*.md docs/plan-2/ 2>/dev/null || true
    echo "✅ plan-2 同步完成"
fi

# 同步 plan-3（如果存在）
if [ -d "plan-3" ]; then
    echo "📁 同步 plan-3..."
    mkdir -p docs/plan-3
    cp plan-3/*.md docs/plan-3/ 2>/dev/null || true
    echo "✅ plan-3 同步完成"
fi

# 可以添加更多计划...

echo ""
echo "🎉 所有文档同步完成！"
echo ""
echo "提示：你可以直接编辑 plan-X/ 目录下的文件，然后运行此脚本同步到 docs/plan-X/"
echo "      或者直接在 docs/plan-X/ 目录下编辑文件。"

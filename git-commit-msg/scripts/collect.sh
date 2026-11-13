#!/bin/bash
# 为 git-commit-msg skill 一次性收集「未提交改动」的全貌。
# 严格只读：只跑 git 读取类命令，绝不 add/commit/push/stash/checkout/reset。
# 用法: bash collect.sh [diff截断行数,默认600]
set -uo pipefail

CAP="${1:-600}"

if ! root=$(git rev-parse --show-toplevel 2>/dev/null); then
  echo "NOT_A_GIT_REPO: $(pwd)"
  exit 0
fi

cd "$root" || { echo "CANNOT_CD: $root"; exit 0; }

echo "== REPO =="
echo "$root"

echo "== BRANCH =="
git branch --show-current 2>/dev/null || echo "(detached HEAD)"

echo "== STATUS (porcelain -uall) =="
git status --porcelain=v1 -uall 2>/dev/null

echo "== STAGED STAT =="
git diff --cached --stat 2>/dev/null

echo "== UNSTAGED STAT =="
git diff --stat 2>/dev/null

echo "== RECENT SUBJECTS (20) =="
git log -20 --format='%s' 2>/dev/null

echo "== LANGUAGE SAMPLE (last 5 full messages) =="
git log -5 --format='%B---' 2>/dev/null | head -60

echo "== STAGED DIFF (cap ${CAP} lines) =="
git diff --cached -U2 2>/dev/null | head -"$CAP"

echo "== UNSTAGED DIFF (cap ${CAP} lines) =="
git diff -U2 2>/dev/null | head -"$CAP"

echo "== UNTRACKED FILES (max 50) =="
git ls-files --others --exclude-standard 2>/dev/null | head -50

echo "== END =="
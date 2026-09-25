#!/usr/bin/env bash
# Point git at the versioned hooks directory. Run once after cloning.
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

git config core.hooksPath .githooks

# Ensure hooks are executable on filesystems that don't preserve the bit.
chmod +x .githooks/* 2>/dev/null || true

echo "core.hooksPath -> $(git config core.hooksPath)"
echo "Hooks installed. See SECURITY.md for what pre-commit blocks."

#!/usr/bin/env bash
# Commit + push for the LA-marketing build-out (5 May 2026).
# Built by Claude in Cowork. Reviewed by Kirstin before executing.
set -euo pipefail

cd "$(dirname "$0")"

echo "=== Sanity check — current branch ==="
git branch --show-current

echo
echo "=== Stage the 24 build-out files (and nothing else) ==="
git add \
  content/02-curriculum/ks3/ceiag/index.md \
  content/02-curriculum/ks3/digital-literacy/index.md \
  content/02-curriculum/ks3/humanities/index.md \
  content/02-curriculum/ks3/pe/index.md \
  content/02-curriculum/ks4/digital-literacy/index.md \
  content/02-curriculum/ks4/humanities/index.md \
  content/02-curriculum/ks5/index.md \
  content/03-overlays/aqa-gcse/english-literature/index.md \
  content/03-overlays/asdan-programme/lifeskills-challenge/index.md \
  content/03-overlays/asdan-programme/my-independence/index.md \
  content/03-overlays/asdan-programme/personal-development-programme/index.md \
  content/03-overlays/asdan-programme/towards-independence/index.md \
  content/03-overlays/asdan-programme/transition-challenge/index.md \
  content/03-overlays/asdan-programme/workright/index.md \
  content/03-overlays/asdan-qualification/employability/index.md \
  content/03-overlays/asdan-qualification/personal-and-social-development/index.md \
  content/03-overlays/asdan-qualification/personal-progress/index.md \
  content/03-overlays/edexcel-functional-skills/english-l1/index.md \
  content/03-overlays/edexcel-functional-skills/maths-l1/index.md \
  content/03-overlays/edexcel-gcse/index.md \
  content/03-overlays/edexcel-igcse/human-biology/07-respiration/index.md \
  content/03-overlays/edexcel-igcse/human-biology/09-internal-transport/index.md \
  content/03-overlays/ocr-gcse/index.md \
  content/03-overlays/wjec-gcse/index.md

echo
echo "=== Diff stat (what's about to be committed) ==="
git diff --cached --stat

echo
echo "=== Commit ==="
git commit -F .claude-commit-message.txt

echo
echo "=== Push to origin/main (auto-deploys via GitHub Action) ==="
git push origin main

echo
echo "=== Done. Live in ~3-5 min at https://curriculum.nudgeeducation.online/ ==="
echo "=== GitHub Actions: https://github.com/nudgeeducation/neo-curriculum-vault/actions ==="

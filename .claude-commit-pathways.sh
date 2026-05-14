#!/usr/bin/env bash
# Pathways tidy-up: replace exam-pathways redirect with a substantive
# Qualification Pathways page; update the index. Built by Claude in
# Cowork, 5 May 2026.
set -euo pipefail

cd "$(dirname "$0")"

echo "=== Sanity check — current branch ==="
git branch --show-current

echo
echo "=== Delete the v0.2-to-v0.3 exam-pathways redirect ==="
rm -v content/04-pathways/exam-pathways.md

echo
echo "=== Stage the changes ==="
git add content/04-pathways/exam-pathways.md \
        content/04-pathways/qualification-pathways.md \
        content/index.md

echo
echo "=== Diff stat ==="
git diff --cached --stat

echo
echo "=== Commit ==="
git commit -m "Pathways tidy: replace exam-pathways redirect with Qualification Pathways

- Delete content/04-pathways/exam-pathways.md (v0.2->v0.3 schema
  migration leftover; was visible in folder listings as 'Exam
  Pathways has moved' which read poorly to commissioners).
- Add content/04-pathways/qualification-pathways.md: substantive
  commissioner-facing page covering the four route families
  (IGCSE / FS / ASDAN / Discovery), stepping-stones (FS Entry to
  IGCSE Foundation; ASDAN tiers), typical 12 and 24 month learner
  pictures, and dual-registration cases.
- Update content/index.md 'By Pathway' section to surface the
  new page above PfA and OEAS criteria."

echo
echo "=== Push to origin/main ==="
git push origin main

echo
echo "=== Done. Live in ~3-5 min at https://curriculum.nudgeeducation.online/ ==="

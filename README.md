# NEO Curriculum Vault

The canonical curriculum library for **Nudge Education Online (NEO)**, operated by Nudge Education Ltd (Company Number 10192753), launching September 2026.

🔗 **Live site:** https://curriculum.nudgeeducation.online/

## Architecture

The vault is built around a **Curriculum × Overlay** model:

- **Curriculum spine** (`content/02-curriculum/`) — what learning *is*. Drawn from the National Curriculum where it exists, from synthesised consensus across awarding bodies where it doesn't, and from NEO-original / statutory frames where neither apply.
- **Overlay layer** (`content/03-overlays/`) — awarding-body specifications mapped onto the curriculum spine. Edexcel IGCSE, AQA GCSE, Pearson Edexcel Functional Skills, ASDAN.
- **Cornerstones** (`content/01-cornerstones/`) — the framing layer for all content (Connection, Movement, Creativity, Reflection, Rest, Nutrition).

A canonical curriculum node carries Curriculum tags. An awarding-body outcome node carries Overlay tags and wikilinks back to the canonical node it tests. Many overlays can point at the same canonical node — that's the architectural point.

See [`content/_schema/tagging-schema.md`](content/_schema/tagging-schema.md) for the full v0.3 tagging schema.

## What's in the vault

- **Cornerstones** — six pages anchoring the framing layer
- **Curriculum (canonical)** — KS3, KS4, KS5 (Phase 2), Life and Work, Relational and Symbolic, Statutory (RSHE)
- **Overlays** — Pearson Edexcel International GCSE, AQA GCSE, Pearson Edexcel UK GCSE (placeholder), OCR GCSE (placeholder), WJEC GCSE (placeholder), Pearson Edexcel Functional Skills, ASDAN Programmes, ASDAN Short Courses, ASDAN Qualifications
- **Pathways** — Preparing for Adulthood, OEAS Accreditation Criteria
- **Areas of Need** — Communication and Interaction, Cognition and Learning, SEMH, Sensory and Physical
- **Resources** — bksb (FS revision platform), revision-guide sourcing pattern

## Stack

Built with [Quartz 4](https://quartz.jzhao.xyz/) on top of an Obsidian-format markdown vault. Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

## Companion repos

- [`nudgeeducation/nudge-policy-vault`](https://github.com/nudgeeducation/nudge-policy-vault) — Nudge Education + NEO unified policy library
- [`nudgeeducation/neo-architecture`](https://github.com/nudgeeducation/neo-architecture) — NEO solutions architecture (private)

## Working on this vault

See [`SETUP.md`](SETUP.md) for local development and [`PUSH_TO_GITHUB.md`](PUSH_TO_GITHUB.md) for the initial push walkthrough.

## Status

v0.4 working draft. Eight subjects fully populated across two key stages, both NEO-original courses (*Relating Intelligently* and *Girls in Green Futures* — Verse-ality Certified) populated, all four Cornerstones Electives populated, RSHE statutory branch populated, full Life-and-Work canonical branch (six sub-branches, ~30 sub-strands), four overlay branches with content-area-level pages where NEO's primary offer sits, and the KS3 → KS4 precursor net wired across English, Maths, Science, and Creative Arts.

The verbatim spec text from licensed proprietary specs (Edexcel, AQA, ASDAN) is **not** in this public vault — only paraphrased outcome statements with source citations. Verbatim text lives in the source spec PDFs and (where included for OEAS audit purposes) on the private side of the hybrid vault.

Maintained by Director, Nudge Education Online — Nudge Education Ltd.

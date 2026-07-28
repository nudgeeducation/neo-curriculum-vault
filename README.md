# NEO Curriculum Vault

![Version](https://img.shields.io/badge/version-0.4--working--draft-2AB3A0)
![Status](https://img.shields.io/badge/status-working_draft-1A2E3B)
![License](https://img.shields.io/badge/License-MIT%20%2B%20CC%20BY%204.0-lightgrey)
![Node](https://img.shields.io/badge/node-22%2B-339933?logo=node.js&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/nudgeeducation/neo-curriculum-vault)

[![Deploy NEO Curriculum Vault](https://github.com/nudgeeducation/neo-curriculum-vault/actions/workflows/deploy.yml/badge.svg)](https://github.com/nudgeeducation/neo-curriculum-vault/actions/workflows/deploy.yml)
[![Built with Quartz 4](https://img.shields.io/badge/built_with-Quartz_4-1A2E3B)](https://quartz.jzhao.xyz/)
[![Interop: Oak Curriculum Ontology](https://img.shields.io/badge/interop-Oak%20Curriculum%20Ontology-1A2E3B)](https://github.com/oaknational/oak-curriculum-ontology)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21648377.svg)](https://doi.org/10.5281/zenodo.21648377)

[![Pearson Edexcel iGCSE](https://img.shields.io/badge/Pearson%20Edexcel-iGCSE-2AB3A0)](content/03-overlays/edexcel-igcse)
[![AQA GCSE](https://img.shields.io/badge/AQA-GCSE-2AB3A0)](content/03-overlays/aqa-gcse)
[![Edexcel Functional Skills](https://img.shields.io/badge/Edexcel-Functional%20Skills-2AB3A0)](content/03-overlays/edexcel-functional-skills)
[![ASDAN](https://img.shields.io/badge/ASDAN-Programmes%20%26%20Qualifications-2AB3A0)](content/03-overlays/asdan-programme)

> **The canonical curriculum library for Nudge Education Online (NEO)** — a Curriculum × Overlay knowledge base mapping what learning *is* to how it's assessed by external awarding bodies.

🔗 **[Live site](https://curriculum.nudgeeducation.online/)** |
🏷️ **[Tagging schema](content/_schema/tagging-schema.md)** |
🔀 **[Companion repos](#companion-repos)**

Operated by [Nudge Education Ltd](https://nudgeeducation.com) (Company Number 10192753) · Developed for **Nudge Education Online (NEO)**, launching September 2026

---

## Table of Contents

- [Working Draft Notice](#working-draft-notice)
- [What Is This?](#what-is-this)
- [Architecture](#architecture)
- [What's in the Vault](#whats-in-the-vault)
- [Interoperability](#interoperability)
- [Stack](#stack)
- [File Structure](#file-structure)
- [Licensing](#licensing)
- [Companion Repos](#companion-repos)
- [Working on This Vault](#working-on-this-vault)
- [Roadmap](#roadmap)
- [Contact](#contact)

---

## Working Draft Notice

This is **v0.4 — a working draft**. Structure, tagging, and content coverage are under active development and subject to change.

- ✅ Two key stages (KS3, KS4) fully populated across eight subjects
- ✅ Both NEO-original courses populated — *Relating Intelligently* and *Girls in Green Futures* (Verse-ality Certified)
- ✅ All four Cornerstones Electives populated
- ✅ RSHE statutory branch populated
- ✅ Full Life-and-Work canonical branch populated (six sub-branches, ~30 sub-strands)
- ✅ KS3 → KS4 precursor net wired across English, Maths, Science, and Creative Arts
- 🚧 Four overlay branches populated at content-area level; deeper granularity in progress
- 🚧 KS5 branch scaffolded; population in progress
- 📝 Feedback and corrections welcome — [open an issue](https://github.com/nudgeeducation/neo-curriculum-vault/issues)

> **A note on scope:** verbatim spec text from licensed proprietary specifications (Edexcel, AQA, ASDAN) is **not** included in this public vault — only paraphrased outcome statements with source citations. Verbatim text lives in the source spec PDFs and, where included for OEAS audit purposes, on the private side of the hybrid vault.

---

## What Is This?

The NEO Curriculum Vault is the single source of truth for what Nudge Education Online teaches and how it maps to external qualifications. It exists to answer two questions at once, for two different audiences:

- **What does a learner actually need to know and be able to do?** — the canonical curriculum spine, independent of any exam board.
- **How does that map onto a qualification a commissioner or parent recognises?** — the overlay layer, tying canonical outcomes to specific awarding-body specifications.

Keeping these separate means the same canonical outcome can sit underneath several different qualifications at once — useful when a learner's assessment route changes, or when NEO adds a new awarding-body partnership without rebuilding the curriculum underneath it.

---

## Architecture

The vault is built around a **Curriculum × Overlay** model:

- **Curriculum spine** (`content/02-curriculum/`) — what learning *is*. Drawn from the National Curriculum where it exists, from synthesised consensus across awarding bodies where it doesn't, and from NEO-original / statutory frames where neither apply.
- **Overlay layer** (`content/03-overlays/`) — awarding-body specifications mapped onto the curriculum spine. Edexcel IGCSE, AQA GCSE, Pearson Edexcel Functional Skills, ASDAN.
- **Cornerstones** (`content/01-cornerstones/`) — the framing layer for all content (Connection, Movement, Creativity, Reflection, Rest, Nutrition).

A canonical curriculum node carries Curriculum tags. An awarding-body outcome node carries Overlay tags and wikilinks back to the canonical node it tests. Many overlays can point at the same canonical node — that's the architectural point.

See [`content/_schema/tagging-schema.md`](content/_schema/tagging-schema.md) for the full v0.3 tagging schema.

---

## What's in the Vault

253 markdown pages across six content layers:

- ✅ **Cornerstones** — six pages anchoring the framing layer
- ✅ **Curriculum (canonical)** — KS3, KS4, KS5 (Phase 2), Life and Work, Relational and Symbolic, Statutory (RSHE)
- ✅ **Overlays** — Pearson Edexcel International GCSE, AQA GCSE, Pearson Edexcel UK GCSE (placeholder), OCR GCSE (placeholder), WJEC GCSE (placeholder), Pearson Edexcel Functional Skills, ASDAN Programmes, ASDAN Short Courses, ASDAN Qualifications
- ✅ **Pathways** — Preparing for Adulthood, OEAS Accreditation Criteria
- ✅ **Areas of Need** — Communication and Interaction, Cognition and Learning, SEMH, Sensory and Physical
- ✅ **Resources** — bksb (FS revision platform), revision-guide sourcing pattern

---

## Interoperability

Canonical outcome pages that anchor to the National Curriculum (2014) carry an optional `nc_ref` frontmatter field referencing the [Oak Curriculum Ontology](https://github.com/oaknational/oak-curriculum-ontology) — see [`content/_schema/nc-ref-extension.md`](content/_schema/nc-ref-extension.md) for the specification and [`scripts/validate-nc-refs.py`](scripts/validate-nc-refs.py) for validation.

Contains public sector information via the Oak Curriculum Ontology, © Oak National Academy, licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

---

## Stack

Built with [Quartz 4](https://quartz.jzhao.xyz/) on top of an Obsidian-format markdown vault. Auto-deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

---

## File Structure

```
neo-curriculum-vault/
├── content/
│   ├── 01-cornerstones/          # Connection, Movement, Creativity, Reflection, Rest, Nutrition
│   ├── 02-curriculum/             # Canonical curriculum spine
│   │   ├── ks3/                   # English, Maths, Science, Humanities, Creative Arts, PE, CEIAG, Digital Literacy, RSHE
│   │   ├── ks4/
│   │   ├── ks5/                   # Phase 2 — scaffolded
│   │   ├── life-and-work/         # Citizenship, Employability, Financial Literacy, Functional English/Maths, Independent Living
│   │   ├── relational-and-symbolic/ # Relating Intelligently, Girls in Green Futures (Verse-ality Certified)
│   │   └── statutory/rshe/
│   ├── 03-overlays/               # Awarding-body specifications mapped to the spine
│   │   ├── edexcel-igcse/
│   │   ├── aqa-gcse/
│   │   ├── edexcel-functional-skills/
│   │   ├── asdan-programme/ · asdan-qualification/ · asdan-short-course/
│   │   ├── edexcel-gcse/ · ocr-gcse/ · wjec-gcse/   # placeholders
│   ├── 04-pathways/               # Preparing for Adulthood, OEAS Accreditation Criteria
│   ├── 05-needs/                  # Communication and Interaction, Cognition and Learning, SEMH, Sensory and Physical
│   ├── 06-resources/              # bksb, revision-guide sourcing
│   └── _schema/
│       ├── tagging-schema.md      # v0.3 Curriculum × Overlay tagging schema
│       └── nc-ref-extension.md    # Oak Curriculum Ontology interop spec
│
├── scripts/
│   └── validate-nc-refs.py        # Validates nc_ref frontmatter against the Oak ontology
│
├── quartz/                        # Quartz 4 site generator
├── docs/
│
├── .github/workflows/
│   └── deploy.yml                 # Build + deploy to GitHub Pages
│
├── CNAME                          # curriculum.nudgeeducation.online
├── LICENSE.txt                    # MIT (code)
├── CONTENT-LICENSE.md             # CC BY 4.0 + exceptions (content)
├── CODE_OF_CONDUCT.md
├── SETUP.md                       # Local development setup
├── PUSH_TO_GITHUB.md              # Initial push walkthrough
└── README.md                      # This file
```

---

## Licensing

Dual-licensed, following the same pattern as Oak's ontology repo:

**Code** (Quartz, configuration, scripts) — [MIT License](LICENSE.txt).

**Content** (everything under `content/`) — [CC BY 4.0](CONTENT-LICENSE.md), with listed exceptions:
- Novacene's Verse-ality Certified courses (CC BY-NC 4.0)
- Awarding-body specifications (their copyright; paraphrased only, never reproduced verbatim)
- OGL 3.0 public sector information via the Oak Curriculum Ontology

---

## Citation

The theoretical framework underlying this vault's Verse-ality Certified relational-and-symbolic curriculum (*Relating Intelligently*, *Girls in Green Futures*) is documented in:

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21648377.svg)](https://doi.org/10.5281/zenodo.21648377)

> Stevens, K., Eve, 11, & The Novacene Ltd. (2026). *Ontological Integrity in Symbolic Systems: A DOG–ROSE–VerseCloud Convergence*. Zenodo. https://doi.org/10.5281/zenodo.21648377
---

## Companion Repos

- [`nudgeeducation/nudge-policy-vault`](https://github.com/nudgeeducation/nudge-policy-vault) — Nudge Education + NEO unified policy library
- [`nudgeeducation/neo-architecture`](https://github.com/nudgeeducation/neo-architecture) — NEO solutions architecture (private)

---

## Working on This Vault

See [`SETUP.md`](SETUP.md) for local development and [`PUSH_TO_GITHUB.md`](PUSH_TO_GITHUB.md) for the initial push walkthrough.

---

## Roadmap

### Current (v0.4 — July 2026)
- ✅ KS3 and KS4 fully populated across eight subjects
- ✅ Both NEO-original courses populated
- ✅ Cornerstones, RSHE statutory branch, and full Life-and-Work branch populated
- ✅ Oak Curriculum Ontology interoperability (`nc_ref` schema + validation script)
- ✅ Four overlay branches populated at content-area level

### Next
- Populate KS5 (Phase 2)
- Deepen overlay granularity beyond content-area level
- Build out placeholder overlays (Pearson Edexcel UK GCSE, OCR GCSE, WJEC GCSE)

**Feedback welcome!** [Open an issue](https://github.com/nudgeeducation/neo-curriculum-vault/issues) with suggestions or corrections.

---

## Contact

- **Live site**: [curriculum.nudgeeducation.online](https://curriculum.nudgeeducation.online/)
- **GitHub Issues**: [Report an issue](https://github.com/nudgeeducation/neo-curriculum-vault/issues)
- **Email**: [neo@nudgeeducation.co.uk](mailto:neo@nudgeeducation.co.uk)

Maintained by Director, Nudge Education Online & Head of School — Nudge Education Ltd.

---
title: NEO Curriculum Vault — nc_ref schema extension (proposal)
version: v0.4-proposal
status: proposal — for review
date: 2026-07-13
owner: Director, Nudge Education Online & Head of School
extends: tagging-schema.md v0.3
---

## Purpose

Add one optional frontmatter field, `nc_ref`, to canonical outcome pages. It anchors a canonical node to the National Curriculum (2014) as represented in the [Oak Curriculum Ontology](https://github.com/oaknational/oak-curriculum-ontology) — a machine-readable, W3C-standard (RDF/SKOS) representation of the NC published by Oak National Academy under OGL 3.0.

This is a reference, not a restructure. The vault's Curriculum × Overlay architecture is unchanged. Nothing about how pages are authored, tagged or published changes. The field is absent everywhere the canonical spine goes beyond the NC — life-and-work, relational-and-symbolic, statutory RSHE — and that absence is itself the architectural statement: NEO's canonical curriculum is wider than the National Curriculum.

## What it buys

**The 2027 problem.** The KS3 canonical branch is hand-written from NC 2014. When the 2027 NC revision lands, a vault with `nc_ref` anchors inherits a machine-tracked diff — which canonical nodes point at changed, removed or renamed NC content — instead of a hand audit.

**A shared vocabulary.** Commissioners, LAs and Oak-aligned tools can resolve exactly which NC content a NEO canonical node covers, cited in a nationally recognised identifier scheme rather than prose.

**Interoperability without the stack.** The vault stays a markdown vault. If a machine-readable export is ever needed, `nc_ref` plus existing frontmatter is sufficient to generate JSON-LD from a script — no RDF authoring, ever.

## Field specification

Optional, multi-valued, canonical-outcome pages only (never overlay pages — overlays already carry awarding-body IDs).

```yaml
nc_ref:
  - natcurric:strand-reading
  - natcurric:substrand-read-critically
```

The `natcurric:` prefix expands to `https://w3id.org/uk/oak/curriculum/nationalcurriculum/` — Oak's namespace for National Curriculum (2014) data. Use the compact form in frontmatter; expansion happens in tooling.

Reference at the most specific level that genuinely corresponds: `strand-*` where a NEO page covers a whole NC strand, `substrand-*` where it covers part of one. Content-descriptor-level references are permitted but not expected — NEO's canonical granularity sits at strand/sub-strand level by design.

**Pinned version:** oak-curriculum-ontology v0.1.3 (June 2026). Oak's release is early (v0.1) and URIs are explicitly subject to change; the validation script exists precisely to catch breakage on upgrade. Do not chase their main branch.

## Rules

1. `nc_ref` only where the correspondence is genuine — same discipline, same content, not thematic resemblance. An empty field is correct for most of the vault.
2. Never on overlay pages, Cornerstones, pathways, needs or resources.
3. Attribution: any published surface that renders `nc_ref` data must credit "Oak National Academy" per OGL 3.0 / their licence terms. The vault README carries the attribution once.
4. This anchors to Oak's *National Curriculum* namespace (`natcurric:`), not Oak's own programme data (`oakcurric:`). We reference the statutory curriculum through their representation of it; we do not reference Oak's teaching programmes.

## Validation

`scripts/validate-nc-refs.py` walks `content/`, collects every `nc_ref` entry, and checks each against a local copy of Oak's published data:

```
python3 scripts/validate-nc-refs.py path/to/oak-data-file.ttl
```

Point it at a downloaded distribution file (`.ttl` or `.nt`) from Oak's releases, or a subject taxonomy file from their repo. Exit code is non-zero on any unresolved reference, so it can join the existing GitHub Actions deploy as a gate later.

## Worked exemplar (this branch)

The four KS3 English canonical pages carry `nc_ref`:

| Page | nc_ref |
| --- | --- |
| `ks3/english/reading.md` | `strand-reading` + `substrand-appreciation-and-love-of-reading`, `substrand-increasingly-challenging-texts`, `substrand-read-critically` |
| `ks3/english/writing.md` | `strand-writing` |
| `ks3/english/grammar-and-vocabulary.md` | `strand-grammar-and-vocabulary` |
| `ks3/english/spoken-english.md` | `strand-spoken-english` |

Strand-level references are certain (Oak's four English strands and the vault's four KS3 English pages both derive directly from the NC 2014 programmes of study). Sub-strand references on `reading.md` are the ones whose labels correspond textually to the KS3 programme of study; **to verify** against Oak's key-stage programme data before extending sub-strand mapping to other pages, since Oak's taxonomy is phase-agnostic and some sibling sub-strands (e.g. `critically-evaluate-texts`, `english-literary-heritage`) may be the KS4-phase equivalents.

## Rollout

1. This exemplar (KS3 English) — review, then merge.
2. KS3 maths and science strand-level anchors.
3. KS4 canonical nodes where an NC anchor genuinely exists (KS4 NC is thin; most KS4 nodes are defined by the union of overlays and may carry no `nc_ref` — correct).
4. Revisit when Oak ships v1.0 / the 2027 NC revision data.

## Open questions

1. Sub-strand phase verification (above).
2. Should the Quartz page template render `nc_ref` (with attribution) or keep it metadata-only? Recommendation: metadata-only until the mapping has coverage.
3. Schema v0.4: fold this into `tagging-schema.md` §4 as a fourth auxiliary family on acceptance.

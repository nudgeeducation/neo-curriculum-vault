---
title: Decision record — phase-free sub-strand identity and the Oak anchoring plan
version: v0.4
status: adopted
date: 2026-10-15
owner: Director, Nudge Education Online & Head of School
extends: tagging-schema.md v0.3, nc-ref-extension.md
---

## Decision

The unit of identity in the NEO curriculum data layer is the **sub-strand, independent of phase**. A sub-strand has one stable ID whatever key stage it is taught in; the key stage is a property of the *progression* (this sub-strand, at this key stage, with these descriptors), not of the node.

The published pages keep their key-stage structure (`ks3/english/reading`, `ks4/english/comprehension`). They are rendered views over the data layer. Nothing about how pages are authored or navigated changes.

## Why

The vault's pages bake phase into the path and the node, and the subject alignment matrices now coming in from curriculum leads bake it into their codes (`KS3.R.1.1`, `KS4.W.2.2`). That shape cannot answer the question NEO exists to ask about a non-linear learner: *how is this strand of knowledge developing for this young person, regardless of where the year-group map says they should be?* If inference is one node at KS3 and an unrelated node at KS4, a diagnostic can only place a learner in a box, not on a line.

Oak's curriculum ontology keeps three structures deliberately separate — the knowledge taxonomy (strand, sub-strand, content descriptor), the programme structure (subject, scheme, progression) and the temporal structure (phase, key stage, year group) — and derives "taught at KS3" from the data rather than storing it twice. Oak's engineers' advice, sought during the 2027 revision conversation, was explicit: one sub-strand, two progressions, different content descriptors under each. Storing the same fact twice means the two copies drift. NEO adopts the same shape so that anchoring, diffing and the eventual prerequisite graph all work on the same identity.

## Consequences for the data layer

1. **Subject alignment sheets** (the curriculum leads' editing surface) carry a phase-free sub-strand ID as the join key, a key-stage column, and the proficiency descriptor for that key stage on the row. Existing phase-bound codes may remain as a secondary column. The ID is the one field that must not change once linked.
2. **The published scale** is the single NEO proficiency scale — Approaching / Developing / Proficient / Refining — including the Discovery Phase. The vault's older emerging / developing / secure / mastering vocabulary is renamed one-to-one; descriptor rewrites follow subject by subject.
3. **Descriptors hang off IDs and are never IDs.** Descriptor text can be reworded at any point; nothing anchors to it. This mirrors Oak's own rule for anchoring to the National Curriculum.
4. **Proficiency judgements about a learner never enter the vault.** The vault is the content side of the graph — nodes, dependencies, descriptors, scale. Learner-level proficiency lives in the platform, keyed back to vault IDs. The public repo stays free of learner data by architecture rather than by vigilance.
5. **Lesson-to-descriptor links are NEO's assertions and live in git**, not only inside Google Classroom. The Classroom sync manifests already map Oak lesson slugs to NEO courses; links from NEO-fied lessons to sub-strand IDs join them, so a change in an Oak or DfE release flags the affected links rather than letting them drift.

## Oak anchoring — what the published piece promises and the vault must keep

*The Knowledge Graph Has No Learner in It* (Building Schools in the Cloud, 28 July 2026) makes two public claims about this vault: that NEO nodes anchor to the National Curriculum by reference where they genuinely correspond, and that branches without an anchor record that absence as a statement, not an omission. Both must be visible on the site, not only in schema documents.

- `nc_ref` is rendered on pages that carry it, with Oak attribution under OGL v3.0.
- The life-and-work, relational-and-symbolic and statutory RSHE index pages carry a consistent line stating that the branch is wider than the National Curriculum and carries no NC anchor by design.
- The roadmap states coverage plainly: KS3 English is the exemplar; KS3 maths and science follow; KS4 English nodes are synthetic (the union of three specifications) and will not anchor.

Three practical rules adopted from Oak's release design:

- **Pin to a release address, not a prose note.** The pinned Oak release (currently oak-curriculum-ontology v0.1.3) is recorded as data; `scripts/validate-nc-refs.py` reads it and runs as a gate in the deploy workflow.
- **Hold the source reference code alongside the URI.** The DfE 2014 programmes of study carry no statement identifiers, so the Oak URI is the identity for now. A `nc_src` field is reserved so that, if the 2027/28 revision ships with DfE identifiers, reconciliation needs a column fill rather than a schema change.
- **Never anchor to descriptor text.**

`nc_ref` coverage is extended from the subject alignment sheets (one Oak sub-strand reference per NEO sub-strand row) and generated onto pages, rather than hand-anchored page by page.

## Plan

**Horizon one — coherent in public.** Rename the scale vocabulary one-to-one; hide or label stub pages (`draft: true` on the Edexcel IGCSE English Literature overlay until the Pearson mapping lands; visible "planned" status on KS5 and the placeholder UK GCSE boards); render `nc_ref` and the no-anchor statements; "learner" not "student" in NEO's own prose; remove local file paths and the legacy provider name from public pages; `.DS_Store` out of git; README counts and roadmap current; `nc-ref-extension.md` status from proposal to adopted.

**Horizon two — the underpinning.** Build the sheet → CSV → generated sub-strand tables pipeline for English on the maths join pattern (`06-resources/neo-maths.md`), with a column whitelist for the public repo; record the Oak pin as data and gate the deploy on validation; reserve `nc_src`; move lesson-to-descriptor links into the manifests.

**Horizon three — the graph.** Once sub-strands are phase-free and anchored, pull Oak's prerequisite edges for mapped nodes and compare them with the vault's hand-wired KS3 → KS4 precursor net. This is what makes diagnostic-driven re-entry pathways real rather than asserted. It depends on the identity decision above, which is why identity comes first.

## Status

Adopted 15 October 2026. Supersedes the phase-bound code convention in the English AO Alignment Matrix v1 and informs the maths alignment map. To be folded into `tagging-schema.md` v0.4 §2.3 and §3 on the next schema revision.

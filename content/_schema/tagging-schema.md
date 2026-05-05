---
title: NEO Curriculum Vault — Tagging Schema
version: v0.3
status: working draft
date: 2026-05-05
owner: Director, Nudge Education Online & Head of School
operating_company: Nudge Education Ltd (Company No. 10192753)
classification: Internal — not for external distribution without sign-off
supersedes: NEO_Curriculum_Vault_Tagging_Schema_v0.2.md (5 May 2026)
---

# NEO Curriculum Vault — Tagging Schema

## Working draft v0.3

Drafted by Claude in Cowork with Kirstin Stevens, Director NEO & Head of School. v0.2 → v0.3 update on 5 May 2026, restructuring the architecture from a single Framework axis into a **Curriculum × Overlay** two-axis model — canonical curriculum spine with awarding-body specifications as overlays.

---

## 0. What changed v0.2 → v0.3

This is a substantive structural revision, not a tag refresh. The motivation:

- The vault should be **useful for multiple audiences with different relationships to assessment** — homeschoolers, LAs, schools, online schools, NEO itself. Each needs to navigate the same content from a different angle.
- It should make **visible the gap between what's useful and what's testable** — the diagnostic move that justifies the architecture in the first place.
- It should honour the position that exam-board specifications describe *assessment*, not *learning* — without leaving learners under-equipped to navigate an assessed world.

**Core change:** the Framework tag family is renamed and split into two families:

- **Curriculum** (the canonical spine): KS3 NC, a synthetic KS4, KS5, life-and-work skills, relational-and-symbolic NEO-originals, RSHE statutory strand. This is *what learning is*.
- **Overlay** (the awarding-body specifications layer): Edexcel IGCSE, AQA GCSE, Pearson Edexcel Functional Skills, ASDAN, etc. This is *how learning gets assessed* by external bodies.

A canonical curriculum node carries Curriculum tags. An awarding-body outcome node carries Overlay tags and wikilinks back to the canonical node it tests. Many overlays can point at the same canonical node — that's the point.

**Other changes:**

- §10 Q2 (Functional Skills awarding body) **resolved** — Pearson Edexcel Functional Skills (Kirstin's call, 5 May 2026, ~99% confidence). FS overlay anchors against Ofqual's regulated Subject Content for English (2018) with Pearson Edexcel FS as the implementation.
- §4.4 Exam Pathway **removed** — its job is now done by the Overlay tag family. A learner being prepared for AQA GCSE English Language carries an Overlay tag pointing at the AQA branch; the registering body and the awarding body are the same thing in this architecture.
- §2.5 Outcome naming convention **updated** — outcomes are now either *canonical* (live in the Curriculum branch) or *overlay* (live in the Overlay branch and wikilink to canonical). The same outcome ID space is replaced by two distinct ID schemes.
- §6 worked examples **rewritten** to show the canonical-and-overlay pattern.
- §8.1 folder structure **reorganised** to match the new architecture.
- §10 new open question added: granularity of overlay outcome IDs (do we follow awarding-body numbering exactly, even where it's coarse, or apply our own finer-grained breakdown?).

**Carried forward unchanged:** Cornerstones (§2.1), Modes (§2.2), Mastery scale (§3), PfA pathways (§4.1), Areas of Need (§4.2), OEAS regulatory anchor (§4.3), Verse-ality Certified quality marker (§2.7), wikilinking patterns (§5), the bridge to the portable portfolio (§7).

---

## 1. Purpose

This document defines the tag taxonomy used to organise the **NEO Curriculum Vault** — an Obsidian vault, published to Quartz, embedded in the NEO Solutions Architecture. The vault holds every specification for every qualification, programme and curriculum strand NEO offers, organised around a **Curriculum × Overlay** model:

- The **Curriculum spine** is the canonical layer — what learning *is*, drawn from the National Curriculum where it exists, and from synthesised, life-and-work, or relational frames where it doesn't.
- The **Overlay layer** maps awarding-body specifications onto the curriculum spine. The same canonical content can carry multiple overlays (Edexcel IGCSE, AQA GCSE, Pearson Edexcel FS, ASDAN), and a user picks their entry point depending on what they need.

The taxonomy provides the metadata that **travels with learner evidence** into the portable portfolio defined in Layer B (the Haven Cloud portfolio architecture, re-keyed for NEO). When a learner is registered with a particular awarding body, their evidence carries the Overlay tag for that board's outcome alongside the canonical Curriculum tag — so the same evidence is simultaneously legible as "what they learned" and "how it counts towards an exam."

The schema is structured around **five primary tag families** (every node carries at least one tag from each — except Overlay, which is optional), **three auxiliary tag families** (applied where alignment is genuine), one Mastery scale, and one quality marker.

---

## 2. The five primary tag families

### 2.1 Cornerstone

The framing layer. Six values, drawn from the NEO Cornerstones as defined in the Teaching and Learning Policy v04.26 §1 and the Curriculum Rationale v2.0 §3.

```
[[cornerstone/connection]]
[[cornerstone/movement]]
[[cornerstone/creativity]]
[[cornerstone/reflection]]
[[cornerstone/rest]]
[[cornerstone/nutrition]]
```

A node may carry more than one Cornerstone tag where the alignment is genuine. Single-Cornerstone tagging preferred where one is dominant. Fit ratings (●●● / ●● / ●) are wikilinked annotations, not tags.

### 2.2 Mode

The operational layer. Three values, from the Teaching and Learning Policy v04.26 §3.

```
[[mode/live]]              — live lessons via Google Meet (qualified subject-specialist teachers)
[[mode/asynchronous]]      — Google Classroom courses, assignments, resources
[[mode/independent]]       — learner-led projects, independent exploration
```

### 2.3 Curriculum (canonical spine)

Identifies where in the canonical curriculum spine a node sits. Single-valued per canonical node — a canonical outcome belongs to exactly one Curriculum branch.

```
[[curriculum/ks3]]                       — Key Stage 3 National Curriculum
[[curriculum/ks4]]                       — Key Stage 4 (synthetic NC; defined by union of overlays — see §6)
[[curriculum/ks5]]                       — Key Stage 5 (Phase 2)
[[curriculum/life-and-work]]             — Functional skills, employability,
                                           independent-living, financial-literacy,
                                           citizenship — life and work as
                                           canonical curriculum, not overlay
[[curriculum/relational-and-symbolic]]   — Relating Intelligently, Girls in
                                           Green Futures, future
                                           Cornerstones Electives — NEO-original
                                           curriculum focused on relational,
                                           ethical and symbolic literacy
[[curriculum/statutory]]                 — RSHE statutory strand (parallel to
                                           NC; not subordinate to it)
```

**Why life-and-work is a Curriculum branch, not an Overlay.** Functional Skills, ASDAN-style portfolio work, and life-skills content are not "overlays of the National Curriculum" — they are alternative *canonical* content. Treating them as overlays would imply the NC is the only legitimate curriculum and everything else is a derivative test of it. That's not true (and it's not what NEO believes about its own offer). Functional Skills English Level 2 has canonical outcomes about reading a tenancy agreement and writing a complaint letter; those outcomes don't sit beneath the NC, they sit alongside it.

**Why relational-and-symbolic is a Curriculum branch, not an Overlay.** *Relating Intelligently* and *Girls in Green Futures* are not awarding-body-specifiable. They sit as canonical curriculum because their content is the learning, not a test of it. They will rarely overlay anything on the awarding-body side, though they may *contribute evidence to* PSHE-related and employability-related overlays where alignment is genuine.

### 2.4 Overlay (awarding-body specifications)

Identifies which awarding-body specification a node belongs to. Optional and multi-valued — many overlays can map to the same canonical curriculum node, and some canonical nodes have no overlay at all.

```
[[overlay/edexcel-igcse]]                — Pearson Edexcel International GCSE
[[overlay/aqa-gcse]]                     — AQA UK GCSE (NE-cohort dominant)
[[overlay/edexcel-gcse]]                 — Pearson Edexcel UK GCSE
[[overlay/ocr-gcse]]                     — OCR GCSE
[[overlay/wjec-gcse]]                    — WJEC / Eduqas GCSE
[[overlay/edexcel-functional-skills]]    — Pearson Edexcel Functional Skills
                                           (chosen by NEO, ~99% confirmed
                                           5 May 2026; underlying standard
                                           is Ofqual's Functional Skills
                                           Subject Content)
[[overlay/asdan-programme]]              — ASDAN Personal Development
                                           Programmes and Short Courses
[[overlay/asdan-qualification]]          — ASDAN regulated qualifications
                                           (Employability, Personal Progress,
                                           Personal and Social Development)
```

**Overlay vs Curriculum — clarification:**

- A learner sitting Pearson Edexcel IGCSE English Language A is being *taught* against canonical KS4 English nodes (Curriculum) and *assessed* against the Edexcel IGCSE 4EA1 specification (Overlay). Their evidence carries both tags.
- A learner doing *Relating Intelligently* is being *taught* against canonical relational-and-symbolic nodes. Their evidence carries the Curriculum tag and (probably) no Overlay tag.
- A learner working through ASDAN Lifeskills Challenge is being *taught* against canonical life-and-work nodes (Curriculum) and *assessed* against ASDAN's portfolio specification (Overlay) — ASDAN is treated as an Overlay because it's awarding-body-moderated, not because it's an alternative form of test.

### 2.5 Outcome

The actual learning outcome, normalised. Outcomes now exist in two forms:

**Canonical outcomes** live in the Curriculum branch. Their IDs are NEO-determined and curriculum-meaningful (not awarding-body-meaningful):

```
[[outcome/curriculum/ks4/english/reading/comprehension-of-unseen-non-fiction]]
[[outcome/curriculum/ks3/maths/number/proportional-reasoning]]
[[outcome/curriculum/life-and-work/functional-english/transactional-writing]]
[[outcome/curriculum/relational-and-symbolic/relating-intelligently/m1-prompting]]
```

**Overlay outcomes** live in the Overlay branch. Their IDs follow the awarding-body's own numbering exactly, so they're commissioner/auditor-citeable:

```
[[outcome/overlay/edexcel-igcse/engl-a/4ea1-ao1]]
[[outcome/overlay/aqa-gcse/engl-lang/ao1]]
[[outcome/overlay/edexcel-functional-skills/english-l2/r1]]
[[outcome/overlay/asdan-programme/lifeskills/employability-3]]
```

Each overlay outcome page wikilinks to **one or more canonical outcome pages** that it tests. Each canonical outcome page is link-back-aware: it surfaces every overlay outcome that points at it, grouped by overlay.

**Each canonical outcome page contains:**

- A short, plain-English statement of what the learning is — written by NEO, not lifted from any awarding body
- Cornerstone tag(s) with fit-rating annotation (●●● / ●● / ●)
- Mode tag(s)
- Curriculum tag (single-valued; e.g. `[[curriculum/ks4]]`)
- Suggested evidence types
- Suggested mastery descriptors at each of the four Mastery levels
- Backlinked overlay outcomes (auto-surfaced from the wikilink graph)
- Linked canonical outcomes from adjacent branches (e.g. KS3 precursor; life-and-work parallel)

**Each overlay outcome page contains:**

- The outcome verbatim from the source specification (private side of the hybrid vault only — copyright)
- Source spec citation (publisher, document title, version, page reference)
- Overlay tag(s) (single-valued usually)
- Wikilink to the canonical outcome it tests
- Awarding-body-specific notes (assessment objectives, exam-paper structure, mark allocation)

### 2.6 What "synthetic KS4 NC" means in practice

KS4 has no standalone published National Curriculum document — at KS4, what counts as the curriculum is essentially the awarding-body specs in aggregate. Rather than authoring a synthetic KS4 NC from scratch, the vault treats the canonical KS4 nodes as **frames defined by the union of overlays that point at them**.

A canonical KS4 English Reading node, for example, is a page that:

- Names the broad area of learning in plain English ("comprehension of unseen non-fiction texts, including 19th–21st century literary prose")
- Surfaces the overlay outcomes that test it (Edexcel IGCSE 4EA1 AO1, AQA GCSE English Language AO1, Pearson Edexcel FS English L2 R1) with wikilink annotations showing which overlay tests what
- Carries Cornerstone, Mode, Mastery descriptors in the canonical voice — these are NEO's, not any awarding body's

The page is navigable two ways: top-down (here's an area of KS4 English; here's how each overlay approaches it) and bottom-up (here's an Edexcel spec point; here's the canonical area; here are the AQA and FS equivalents). What learning *is* at KS4 becomes the consensus across overlays, made visible.

This means **no separate authorial work is needed to create a synthetic KS4 NC document**. The canonical nodes are defined by the wikilink graph, and the graph is populated as overlays are added. KS3 is different — there, an actual NC document exists and the canonical nodes are written from it. KS5 is a Phase 2 question.

---

## 2.7 Quality marker — Verse-ality Certified

A single-value quality marker, not a tag family. Applied to NEO-original courses (and any future content) that meets Novacene's Verse-ality safety standard — covering identity containment, consent gates, bounded autonomy, and human-in-the-loop principles for any content involving AI literacy, agentic systems, or digitally-mediated relationships.

```
[[verse-ality-certified]]
```

Currently applied to:

- *Relating Intelligently* (Novacene IP, licensed free to NEO)
- *Girls in Green Futures* (Novacene IP, licensed free to NEO)

The marker is binary — a course either is or isn't Verse-ality Certified — and the decision sits with The Novacene Ltd as IP holder. For the certification process for NEO-authored courses, see §10 Q5.

---

## 3. The Mastery scale

```
[[mastery/emerging]]   [[mastery/developing]]   [[mastery/secure]]   [[mastery/mastering]]
```

Lifted unchanged from the Teaching and Learning Policy v04.26 §5. Descriptor-based; no numerical grades. A learner's evidence carries one Mastery tag per outcome demonstration. The Mastery tag is the only primary tag added at the *evidence* stage rather than inherited from the spec.

A single piece of evidence may carry multiple `(canonical-outcome, overlay-outcome, mastery)` triples — for example, a writing piece may evidence canonical KS4 English transactional-writing at *secure*, simultaneously evidence Edexcel IGCSE 4EA1 AO5 at *secure*, and simultaneously evidence Edexcel FS English L2 W1 at *mastering*.

---

## 4. Auxiliary tag families

Three additional tag families add commissioner-, EHCP- or SEND-relevant metadata.

### 4.1 Preparing for Adulthood pathway

Drawn from the SEND Code of Practice for England, also the spine of ASDAN's My Independence and Preparing for Adulthood programmes.

```
[[pfa/employment]]
[[pfa/independent-living]]
[[pfa/friends-relationships-community]]
[[pfa/good-health]]
```

Used most densely in life-and-work canonical nodes and ASDAN overlay nodes. Critical for EHCP outcome mapping in commissioner reports.

### 4.2 Areas of Need

Four broad areas from the SEND Code of Practice. These describe the *learner profile* a particular delivery approach is well-suited to, **not** the outcome itself.

```
[[need/communication-interaction]]
[[need/cognition-learning]]
[[need/social-emotional-mental-health]]
[[need/sensory-physical]]
```

Applied at the level of delivery notes, not at outcome level. A node tagged `[[need/social-emotional-mental-health]]` indicates the way this content is taught at NEO has been designed with SEMH needs in mind — relevant for the EBSNA cohort, where the framing matters as much as the content.

### 4.3 OEAS regulatory anchor

```
[[oeas/curriculum-breadth]]
[[oeas/curriculum-balance]]
[[oeas/curriculum-rigour]]
[[oeas/teaching-quality]]
```

Maps to the OEAS accreditation criteria referenced in the T&L Policy v04.26 §1. Every OEAS criterion the vault helps NEO evidence carries the relevant tag, so a single query produces the audit pack.

---

## 5. Wikilinking pattern

**Tags are normative; wikilinks are connective.** Four primary patterns:

**Canonical ↔ Overlay links.** Every overlay outcome page wikilinks to the canonical outcome(s) it tests. Every canonical outcome page surfaces its backlinks. This is the architectural axis of the vault.

**Cross-curriculum links.** A canonical KS3 outcome that is a precursor to a KS4 outcome wikilinks forward; the KS4 page wikilinks back. A canonical life-and-work outcome that overlaps with a KS4 NC outcome wikilinks across.

**Cross-overlay links.** Where an Edexcel IGCSE outcome and an AQA GCSE outcome both test the same canonical content, they implicitly meet at the canonical node, but they may also wikilink directly to each other for cross-board navigation ("if you're switching from AQA to Edexcel, here's the equivalent point").

**Cornerstone clusters.** Each Cornerstone has an index page that wikilinks to every canonical outcome carrying its tag. Most non-teacher visitors arrive via Cornerstone.

---

## 6. Worked examples

### 6.1 Canonical KS4 English Reading node (synthetic; defined by union of overlays)

```yaml
title: KS4 English — Comprehension of unseen non-fiction
type: canonical-outcome
curriculum: ks4
domain: english
strand: reading
cornerstone: connection (●●●), reflection (●●●)
mode: live, asynchronous
oeas: curriculum-rigour, teaching-quality
mastery_scale: applies
```

**What this is.** Identifying explicit and implicit information from unseen non-fiction texts; explaining how writers use language and structure to achieve effects and influence readers; comparing writers' ideas and perspectives across different texts.

**Tested by:**

- `[[outcome/overlay/edexcel-igcse/engl-a/4ea1-ao1]]` — Edexcel IGCSE English Language A, AO1
- `[[outcome/overlay/edexcel-igcse/engl-a/4ea1-ao2]]` — Edexcel IGCSE English Language A, AO2
- `[[outcome/overlay/aqa-gcse/engl-lang/ao1]]` — AQA GCSE English Language, AO1
- `[[outcome/overlay/aqa-gcse/engl-lang/ao2]]` — AQA GCSE English Language, AO2
- `[[outcome/overlay/edexcel-functional-skills/english-l2/r1]]` — FS English Level 2, Reading 1

**Precursor:** `[[outcome/curriculum/ks3/english/reading/comprehension]]`

**Suggested evidence types:** annotated text response · structured short-answer · comparative essay · spoken commentary · close-reading conversation

**Mastery descriptors:** *To populate.*

### 6.2 Edexcel IGCSE English Language A overlay outcome

```yaml
title: Edexcel IGCSE English Language A — AO1 (Reading)
type: overlay-outcome
overlay: edexcel-igcse
spec: 4EA1 (Pearson Edexcel International GCSE English Language A 9–1)
spec_id: AO1
private_only: true (verbatim spec text on private side of vault)
```

**Verbatim spec text:** *(private side only — copyright)*

**Tests canonical:** `[[outcome/curriculum/ks4/english/reading/comprehension-of-unseen-non-fiction]]`

**Cross-overlay equivalents:**
- `[[outcome/overlay/aqa-gcse/engl-lang/ao1]]`
- `[[outcome/overlay/edexcel-functional-skills/english-l2/r1]]`

**Awarding-body notes:** AO1 weighting 12% of overall qualification mark; assessed in Paper 1 Section A. Onscreen assessment available from 2023.

### 6.3 Functional Skills English Level 2 overlay outcome (Pearson Edexcel)

```yaml
title: Pearson Edexcel FS English Level 2 — Reading 1
type: overlay-outcome
overlay: edexcel-functional-skills
spec: Pearson Edexcel Functional Skills English Level 2
underlying_standard: Ofqual Functional Skills Subject Content for English (2018)
revision_platform: bksb
```

**Tests canonical:** `[[outcome/curriculum/ks4/english/reading/comprehension-of-unseen-non-fiction]]`

**Cross-overlay equivalents:**
- `[[outcome/overlay/edexcel-igcse/engl-a/4ea1-ao1]]`
- `[[outcome/overlay/aqa-gcse/engl-lang/ao1]]`

**Awarding-body notes:** Functional Skills Level 2 is broadly equivalent to GCSE Grade 4 ("good pass"). Assessment is via on-demand, online testing — significantly lower-stakes than GCSE/IGCSE for anxious learners.

### 6.4 NEO-original canonical outcome — *Relating Intelligently* Module 1

```yaml
title: Relating Intelligently — M1 Prompting
type: canonical-outcome
curriculum: relational-and-symbolic
quality_marker: verse-ality-certified
ip_holder: The Novacene Ltd
licence: CC BY-NC 4.0; free licence to NEO via The Novacene Ltd
cornerstone: reflection (●●●), connection (●●), creativity (●●)
mode: live, independent
need: social-emotional-mental-health
oeas: curriculum-breadth
mastery_scale: applies (placeholder descriptors)
```

**What this is.** Recognising how prompting shapes responses from AI systems; understanding the symbolic and relational dimensions of human-AI interaction; using questions intentionally rather than reactively.

**Tested by:** *(no overlay — this is canonical NEO-original content; not awarding-body-specifiable)*

**Cross-curriculum links:**
- `[[outcome/curriculum/statutory/rshe/online-safety/ai-and-deepfakes]]` — overlaps with the 2026 RSHE statutory online-safety / AI-literacy strand

### 6.5 ASDAN as overlay (worked example for the overlay branch shape)

```yaml
title: ASDAN Lifeskills Challenge — Employability Module
type: overlay-outcome
overlay: asdan-programme
exam_pathway: portfolio-moderated by ASDAN
```

**Tests canonical:** 
- `[[outcome/curriculum/life-and-work/employability/cv-and-application]]`
- `[[outcome/curriculum/life-and-work/employability/interview-skills]]`
- `[[outcome/curriculum/life-and-work/independent-living/communicating-with-services]]`

**Notes:** ASDAN is treated as an Overlay because it is awarding-body-moderated (ASDAN itself), even though its content is project-based and portfolio-assessed rather than exam-tested. The same canonical life-and-work outcomes can carry overlays from ASDAN, Edexcel FS, or AQA GCSE depending on the learner's pathway.

---

## 7. The bridge — Layer A → Layer B

This section defines how curriculum vault tags travel into learner evidence and onwards into the portable portfolio. **This is the architectural lift from Project Weaver, in the v0.3 architecture.**

**At the planning stage.** When a teacher creates a project or unit, they pick canonical Curriculum outcomes from the vault. Where the learner is being prepared for an external qualification, the teacher also surfaces the Overlay outcomes that map to those canonical outcomes — often automatically, via the wikilink graph. The teacher's planning artefact carries both as YAML frontmatter.

**At the delivery stage.** The learner produces evidence — in any mode, in any medium — captured in Google Classroom against the assignment template. The template's metadata block pre-populates the Curriculum tag (always) and the Overlay tag (if applicable, drawn from the planning artefact). Learner `.verse`/`.know` files inherit both.

**At the assessment stage.** The Mastery tag is added by the teacher and / or the learner, formative or summative. A single piece of evidence may carry multiple `(canonical, overlay, mastery)` triples.

**At the export stage (V1).** The portable bundle is a folder of `.verse`/`.know` files plus a `manifest.json`, signed per Verse-ality conventions. Each evidence node in the bundle carries:

- Canonical outcome reference (always)
- Overlay outcome reference (where applicable)
- Mastery
- Cornerstone, Mode, auxiliary tags as inherited

The bundle renders into:

- a **PDF portfolio** — human-readable, Cornerstone-grouped
- a **spreadsheet of evidence-by-outcome** — commissioner-friendly; columns for Canonical Outcome × Overlay Outcome × Mastery × Date × Evidence reference. The Overlay column is what makes EHCP / OEAS / commissioner reports auto-generable.
- a **mycelial portfolio view** — the Haven Cloud-style network map, re-keyed to Cornerstones, learner-controlled.

**The structural inversion holds.** The school owns the canonical curriculum data. The learner owns the evidence data. The Overlay annotations on the learner's evidence make their record portable and meaningful in an assessed world *without* that world owning them.

---

## 8. Implementation notes

### 8.1 Vault structure (revised for v0.3)

```
neo-curriculum-vault/
├── README.md
├── content/
│   ├── index.md
│   ├── _schema/
│   │   └── tagging-schema.md (this document)
│   ├── 01-cornerstones/
│   │   ├── index.md
│   │   ├── connection.md  movement.md  creativity.md
│   │   ├── reflection.md  rest.md  nutrition.md
│   ├── 02-curriculum/                        ← canonical spine (was 02-frameworks)
│   │   ├── index.md
│   │   ├── ks3/
│   │   │   ├── english/  maths/  science/
│   │   │   ├── creative-arts/  digital-literacy/
│   │   │   ├── humanities/  pe/  ceiag/
│   │   ├── ks4/
│   │   │   ├── english/  maths/  science/  ...
│   │   │   (canonical nodes defined by union of overlays — see §2.6)
│   │   ├── ks5/                              (Phase 2)
│   │   ├── life-and-work/                    canonical, not overlay
│   │   │   ├── functional-english/
│   │   │   ├── functional-maths/
│   │   │   ├── employability/
│   │   │   ├── independent-living/
│   │   │   ├── financial-literacy/
│   │   │   ├── citizenship/
│   │   ├── relational-and-symbolic/          NEO-original canonical
│   │   │   ├── relating-intelligently/      (Verse-ality Certified)
│   │   │   ├── girls-in-green-futures/      (Verse-ality Certified)
│   │   │   ├── cornerstones-electives/
│   │   └── statutory/                        parallel to NC
│   │       └── rshe/
│   │           ├── relationships-education/
│   │           ├── sex-education/
│   │           ├── health-education/
│   │           ├── online-safety/
│   ├── 03-overlays/                          ← awarding-body specifications (new)
│   │   ├── index.md
│   │   ├── edexcel-igcse/
│   │   │   ├── english-language-a/
│   │   │   ├── english-literature/
│   │   │   ├── art-design/
│   │   │   ├── human-biology/
│   │   │   ├── maths-a/
│   │   │   └── combined-science/
│   │   ├── aqa-gcse/
│   │   │   ├── english-language/
│   │   │   ├── english-literature/
│   │   │   ├── maths/
│   │   │   └── (others as cohort requires)
│   │   ├── edexcel-gcse/  ocr-gcse/  wjec-gcse/  (placeholder; populate when needed)
│   │   ├── edexcel-functional-skills/
│   │   │   ├── english-l1/  english-l2/
│   │   │   ├── maths-l1/  maths-l2/
│   │   ├── asdan-programme/
│   │   │   ├── personal-development-programme/
│   │   │   ├── lifeskills-challenge/
│   │   │   ├── (etc.)
│   │   └── asdan-qualification/
│   │       ├── employability/
│   │       ├── personal-progress/
│   │       └── personal-and-social-development/
│   ├── 04-pathways/                          (unchanged)
│   │   ├── preparing-for-adulthood.md
│   │   └── oeas-criteria.md
│   │   (exam-pathways.md removed — folded into 03-overlays/index.md)
│   ├── 05-needs/                             (unchanged)
│   └── 06-resources/                         (unchanged)
│       ├── bksb.md  revision-guides.md
└── README.md
```

Numbering shifts: the old 03-pathways becomes 04-pathways, the old 04-needs becomes 05-needs, the old 05-resources becomes 06-resources. New folder 03-overlays takes the third slot.

### 8.2 Publication pipeline — hybrid (clarified for v0.3)

**Public side** (Quartz-published):

- `_index/`, `01-cornerstones/`, `02-curriculum/` (all canonical content NEO authors), `04-pathways/`, `05-needs/`, `06-resources/`
- `03-overlays/` **summary pages only** — index pages naming each awarding body and listing which canonical outcomes their overlay touches. Useful for commissioners and homeschoolers who want to know "which canonical content is covered by AQA GCSE English Language?"
- All NEO-original canonical content where licensing permits (Verse-ality Certified content is CC BY-NC 4.0; NEO-authored content is Nudge Education Ltd copyright but defaults public unless flagged).

**Private side** (Quartz-built but unpublished, or separate private repo):

- `03-overlays/` outcome pages with **verbatim spec text** from licensed proprietary specs (Edexcel, AQA, ASDAN) — copyright reasons.
- OEAS audit pack pages (full evidence dossier).
- IP-sensitive NEO-original content where flagged.

The same Quartz pipeline runs both, with `public: true` / `public: false` frontmatter switching publication.

### 8.3 Embedding in Solutions Architecture

Vault is referenced from `neo-architecture/solutions-architecture/solutions-architecture.md` §4–8 as the canonical curriculum data source. New appendix **Curriculum Data Model** documents:

- The Curriculum × Overlay architecture (§2.3, §2.4, §2.6)
- The five primary tag families, three auxiliary tag families, Verse-ality Certified marker
- The wikilink patterns (§5)
- The bridge from vault to portfolio (§7)
- The export bundle format and rendering paths
- The hybrid publication model (§8.2)

### 8.4 Maintenance ownership

Vault owner is the **Curriculum Lead** once filled. Until then, Director NEO holds the pen. Emily Baty co-owns the `02-curriculum/statutory/rshe/` branch. NEO-original Verse-ality Certified courses (in `02-curriculum/relational-and-symbolic/`) are co-stewarded with The Novacene Ltd as IP holder.

### 8.5 Revision and assessment-prep resources

[[bksb]] referenced from Pearson Edexcel FS overlay outcome pages. Revision guides linked from each overlay outcome page with sourcing notes (Amazon ISBNs, publisher links). All linked, none Framework-tagged.

---

## 9. Sources reviewed for this draft

- NEO Teaching and Learning Policy v04.26 (live)
- Nudge Access Curriculum Rationale v2.0 (March 2026)
- Nudge Cornerstones / RSHE / PSHE Mapping v0.1 (March 2026)
- ASDAN SEND provision page (asdan.org.uk/setting/send-provision/, retrieved 5 May 2026)
- Pearson Edexcel International GCSE specifications (in Nudge Curriculum folder): English Language A, English Literature, Art and Design, Human Biology, Maths A, Science (Double Award + Human Biology)
- Ofqual Functional Skills Subject Content for English / Maths (2018) — to fetch
- Pearson Edexcel Functional Skills English / Maths Level 1 / Level 2 — to fetch
- AQA GCSE English Language and English Literature specifications — to fetch
- The Novacene *Relating Intelligently* course pack (CC BY-NC 4.0; Verse-ality Certified)
- The Novacene *Girls in Green Futures* course pack (eight modules, March–April 2026; Verse-ality Certified; built for Gleeds Energy & Defence)
- Haven Cloud portfolio prototype (thenovacene.github.io/haven-cloud/portfolio.html)
- Project Weaver methodology (NLN call transcript 29 April 2026)
- NEO Solutions Architecture v0.2-draft (github.com/nudgeeducation/neo-architecture)
- Nudge Functional Skills coordinator operational note (5 May 2026)

---

## 10. Open questions

**Resolved in v0.3:**

- ~~Q2 Functional Skills awarding-body sub-choice~~ — **Pearson Edexcel** (Kirstin's call, 5 May 2026, ~99% confidence). FS overlay anchors against Ofqual's Subject Content with Pearson Edexcel as implementation.
- ~~Exam Pathway as a separate auxiliary tag family~~ — folded into the Overlay primary tag family.

**Carried over from v0.2 (still open):**

1. **Specs not yet on hand.** Edexcel IGCSE specs are in the curriculum folder. Still needed: Pearson Edexcel Functional Skills English/Maths Level 1 and Level 2 specs; Ofqual FS Subject Content for English and Maths (2018); AQA GCSE English Language / Literature / Maths specifications; ASDAN full course handbooks; KS3 NC strand documents; RSHE 2026 statutory guidance text. Most are publicly available — I can fetch as needed via the NEO architecture repo's existing tooling pattern.

2. **Edexcel IGCSE entry-centre arrangements.** NEO doesn't run exams. For Edexcel IGCSE entry, are NEO learners typically registered through their LA's exam centre, Pearson's online assessment route (where the onscreen option exists for English Lang/Lit), or a NEO-recommended partner exam centre? Affects how learners actually access summative assessment. **Owner:** Kirstin / Director of Operations.

3. **Mastery descriptors per canonical outcome.** Each canonical page is supposed to carry suggested Mastery descriptors at all four levels. Drafting these for hundreds of canonical outcomes is significant work. **Suggestion:** stub each canonical outcome page with placeholders, populate descriptors gradually as projects are designed and learner evidence accumulates. Curriculum Lead owns this as ongoing work.

4. **PfA alignment for EBSNA cohort.** Confirm with Emily Baty that PfA tagging is the right SEND framing given EBSNA-cohort context. Possible compromise: tag as PfA in back-end metadata, use softer language in learner-facing pages.

5. **Verse-ality Certification process for NEO-authored courses.** What's the submission and review process from NEO to The Novacene Ltd if NEO-authored content (e.g. future Cornerstones Electives) wants to bear the marker?

**New in v0.3:**

6. **Overlay outcome granularity.** Awarding-body specs vary in how granular their published outcome lists are. Edexcel IGCSE has Assessment Objectives (broad) and detailed mark-scheme criteria (fine). AQA GCSE has Assessment Objectives plus topic content. Ofqual FS has Reading/Writing/SLC components and detailed skill statements. Question: do overlay outcome IDs follow the awarding-body's published outcome IDs exactly (which means some overlays are coarse and some are fine), or do we apply our own consistent finer-grained breakdown (which means we're inventing IDs the awarding bodies don't recognise)? **Recommendation:** follow each awarding body's own numbering. The vault gains nothing by inventing finer IDs that don't appear on mark schemes; the canonical-side wikilinks do the bridging work where granularity differs.

7. **Schema review cadence.** Annual review aligned to T&L Policy review (April), interim check-in at September 2026 launch.

---

*v0.3 — draft for review by Kirstin Stevens. Folder refactor and English Language A worked exemplar to follow as next two steps.*

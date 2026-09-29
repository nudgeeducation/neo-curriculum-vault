# Classroom sync

`classroom_sync.gs` is the canonical Google Apps Script that mirrors each subject's curriculum manifest into its Google Classroom master courses (one topic per unit, one material per lesson). The installed copy is the Apps Script project **"NEO Classroom sync"** in the NEO tenant — keep the two identical; edit here, then paste there.

Subjects and their target classrooms are listed in `CONFIG.SUBJECTS` at the top of the script. Git is canonical; Classroom is derived; the script only ever touches posts it created.

## Manifests

| Subject | Manifest | Classroom |
|---|---|---|
| Maths | `neo-maths/docs/data/curriculum.json` (NEO-authored lesson pages) | Mathematics \| Foundation \| Master · Mathematics \| Intermediate \| Master |
| Science, Foundations | `neo-science/docs/data/curriculum-foundations-oak.json` (Oak KS3 science, all strands) | Science \| Foundation \| Master (Oak) |
| English, Foundations | `classroom/manifests/english-foundations-oak.json` here (Oak KS3 English) | English \| Foundation \| Master (Oak) |
| RSHE Year 9 / Year 10 | `classroom/manifests/rshe-year9-oak.json`, `rshe-year10-oak.json` here (Oak RSHE/PSHE, read off the site by `rshe_manifest.py` — not in the ontology) | RSHE Year 9 · RSHE Year 10 — posted as **drafts**; the RSHE lead publishes each lesson when delivered |

Oak-derived manifests are built with `oak_manifest.py` from the [Oak curriculum ontology](https://github.com/oaknational/oak-curriculum-ontology) (OGL v3.0). A manifest lives here when its subject repo is private (the sync fetches over plain HTTPS), otherwise in the subject repo.

```bash
python3 classroom/oak_manifest.py --ontology /tmp/oak --subject english \
  --files english-key-stage-3.ttl english-programme-structure.ttl \
  --programme-prefix programme-english-year-group- --years 7 8 9 \
  --stage Foundations --site-title "NEO English · Foundations (Oak)" \
  --teacher-programme english-secondary-ks3 --pupil-programme "english-secondary-year-{year}" \
  --out classroom/manifests/english-foundations-oak.json
```

A subject with `state: 'DRAFT'` posts materials hidden from learners (educator-led content, adult supervision required); the sync never pulls a post an educator has published back to draft.

NEO-fying a lesson: replace its `url` with a site-relative `file` in the manifest and re-run the sync.

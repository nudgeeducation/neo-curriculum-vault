# Classroom sync

`classroom_sync.gs` is the canonical Google Apps Script that mirrors each subject's `curriculum.json` manifest into its Google Classroom master courses (one topic per unit, one material per lesson). The installed copy is the Apps Script project **"NEO Classroom sync"** in the NEO tenant — keep the two identical; edit here, then paste there.

Subjects and their target classrooms are listed in `CONFIG.SUBJECTS` at the top of the script. Manifests live in each subject repo (`neo-maths/docs/data/curriculum.json`, `neo-science/docs/data/curriculum-foundations-oak.json`, …). Git is canonical; Classroom is derived; the script only ever touches posts it created.

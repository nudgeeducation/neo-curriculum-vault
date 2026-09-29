/**
 * NEO curriculum → Google Classroom sync (Apps Script)
 *
 * Canonical copy: nudgeeducation/neo-curriculum-vault/classroom/classroom_sync.gs
 * Installed copy: Apps Script project "NEO Classroom sync" (NEO tenant) — keep identical.
 *
 * For each subject, reads its curriculum.json manifest from GitHub and mirrors it
 * into the Classroom courses listed under `targets`: one Topic per unit, one
 * Material per lesson. A lesson links to `url` if the manifest gives one (e.g. an
 * Oak National Academy lesson page) or to `siteBase + file` (a NEO lesson page).
 * When a lesson is NEO-fied, change the manifest and re-run: the link swaps.
 *
 * Git is canonical; Classroom is derived. Idempotent — every post the script
 * creates carries a marker `<prefix>:<lesson id>` in its description, and only
 * marker-bearing posts are ever updated or removed. Educator-authored posts are
 * never touched. No learner data is read or written.
 *
 * A target with no courseId is created on first run (name + section below,
 * owned by the account running the script); the new id is logged — paste it
 * into CONFIG so later runs address the course directly.
 *
 * Setup: script.google.com as a nudgeeducation.online account → paste this file
 * → appsscript.json enables the Classroom advanced service with scopes
 * classroom.courses, classroom.topics, classroom.courseworkmaterials,
 * script.external_request → run previewSync() then syncClassroom().
 * Apps Script runs are capped at 6 minutes; the script stops cleanly before
 * that and a re-run picks up where it left off.
 */

const CONFIG = {
  SUBJECTS: [
    {
      key: 'maths',
      markerPrefix: 'neo-maths',
      siteLabel: 'NEO Maths',
      manifestUrl: 'https://raw.githubusercontent.com/nudgeeducation/neo-maths/main/docs/data/curriculum.json',
      siteBase: 'https://nudgeeducation.github.io/neo-maths/',
      targets: [
        { name: 'Mathematics | Foundation | Master',   courseId: '878455913553', stages: ['Foundations', 'Key Stage 3'] },
        { name: 'Mathematics | Intermediate | Master', courseId: '869529966246', stages: ['Intermediate'] },
      ],
    },
    {
      key: 'science-foundations-oak',
      markerPrefix: 'neo-science',
      manifestUrl: 'https://raw.githubusercontent.com/nudgeeducation/neo-science/main/docs/data/curriculum-foundations-oak.json',
      siteBase: 'https://nudgeeducation.github.io/neo-science/',
      targets: [
        { name: 'Science | Foundation | Master (Oak)', section: 'Oak National Academy KS3 science — all strands', courseId: '888005508619', stages: ['Foundations'] },
      ],
    },
  ],
  ONLY_LIVE: true,
  TIME_BUDGET_MS: 5 * 60 * 1000,
};

const START_ = Date.now();
function outOfTime_() { return Date.now() - START_ > CONFIG.TIME_BUDGET_MS; }

function syncClassroom() {
  const results = {};
  CONFIG.SUBJECTS.forEach(function (subject) {
    const manifest = JSON.parse(UrlFetchApp.fetch(subject.manifestUrl).getContentText());
    subject.targets.forEach(function (target) {
      if (outOfTime_()) { results[target.name] = 'skipped — time budget; re-run'; return; }
      const courseId = ensureCourse_(target);
      results[target.name] = syncCourse_(subject, manifest, target, courseId);
    });
  });
  Logger.log(JSON.stringify(results, null, 1));
  return results;
}

function ensureCourse_(target) {
  if (target.courseId) return target.courseId;
  // Look for an existing course of that name owned by the running account first.
  let pageToken;
  do {
    const res = Classroom.Courses.list({ teacherId: 'me', pageSize: 100, pageToken: pageToken,
                                         courseStates: ['ACTIVE', 'PROVISIONED'] });
    const hit = (res.courses || []).filter(function (c) { return c.name === target.name; })[0];
    if (hit) { Logger.log('Using existing course "' + target.name + '" id=' + hit.id + ' — add it to CONFIG'); return hit.id; }
    pageToken = res.nextPageToken;
  } while (pageToken);
  const created = Classroom.Courses.create({
    name: target.name, section: target.section || '', ownerId: 'me', courseState: 'ACTIVE' });
  Logger.log('Created course "' + target.name + '" id=' + created.id + ' — add it to CONFIG');
  return created.id;
}

function syncCourse_(subject, manifest, target, courseId) {
  const topics = topicsByName_(courseId);
  const existing = materialsByMarker_(courseId, subject.markerPrefix);
  const log = { courseId: courseId, topicsCreated: 0, created: 0, updated: 0, unchanged: 0, removed: 0, topicsRemoved: 0, stoppedEarly: false };
  const wanted = {};
  const wantedTopics = {};
  const attribution = manifest.attribution || '';

  // Classroom lists newest-first within a topic, so walk in reverse: Lesson 01 ends up on top.
  const units = manifest.units.filter(function (u) { return target.stages.indexOf(u.stage) !== -1; }).reverse();
  for (let ui = 0; ui < units.length; ui++) {
    const unit = units[ui];
    const topicName = unit.topic || unit.title;
    wantedTopics[topicName] = true;
    let topic = topics[topicName];
    if (!topic) {
      if (outOfTime_()) { log.stoppedEarly = true; break; }
      topic = Classroom.Courses.Topics.create({ name: topicName }, courseId);
      topics[topicName] = topic;
      log.topicsCreated++;
    }

    const lessons = unit.lessons.slice().reverse();
    for (let li = 0; li < lessons.length; li++) {
      const lesson = lessons[li];
      if (CONFIG.ONLY_LIVE && lesson.status !== 'live') continue;
      const marker = subject.markerPrefix + ':' + lesson.id;
      wanted[marker] = true;
      const title = lesson.num + ' · ' + lesson.title;
      const url = lesson.url || (subject.siteBase + lesson.file);
      const description = [
        unit.title + ' · ' + unit.stage + (unit.strand ? ' · ' + unit.strand : ''),
        lesson.outcome ? 'Outcome: ' + lesson.outcome : null,
        lesson.teacherUrl ? 'Educator resources (slides, worksheet, quizzes): ' + lesson.teacherUrl : null,
        lesson.url ? attribution : 'Interactive lesson page on the ' + (subject.siteLabel || 'NEO') + ' site.',
        marker,
      ].filter(Boolean).join('\n');

      const found = existing[marker];
      if (found) {
        const sameLink = found.materials && found.materials[0] && found.materials[0].link &&
                         found.materials[0].link.url === url;
        if (found.title === title && found.topicId === topic.topicId && sameLink && found.description === description) {
          log.unchanged++;
          continue;
        }
        if (outOfTime_()) { log.stoppedEarly = true; break; }
        if (!sameLink) {
          // materials are not patchable — replace the post
          Classroom.Courses.CourseWorkMaterials.remove(courseId, found.id);
          Classroom.Courses.CourseWorkMaterials.create(material_(title, description, url, topic.topicId), courseId);
        } else {
          Classroom.Courses.CourseWorkMaterials.patch(
            { title: title, description: description, topicId: topic.topicId },
            courseId, found.id, { updateMask: 'title,description,topicId' });
        }
        log.updated++;
      } else {
        if (outOfTime_()) { log.stoppedEarly = true; break; }
        Classroom.Courses.CourseWorkMaterials.create(material_(title, description, url, topic.topicId), courseId);
        log.created++;
      }
    }
    if (log.stoppedEarly) break;
  }
  if (log.stoppedEarly) return log;   // removals only on a complete pass

  Object.keys(existing).forEach(function (marker) {
    if (!wanted[marker]) {
      Classroom.Courses.CourseWorkMaterials.remove(courseId, existing[marker].id);
      log.removed++;
    }
  });

  const unitTopicNames = {};
  manifest.units.forEach(function (u) { unitTopicNames[u.topic || u.title] = true; });
  const remaining = materialsByMarker_(courseId, subject.markerPrefix);
  const topicsInUse = {};
  Object.keys(remaining).forEach(function (m) { topicsInUse[remaining[m].topicId] = true; });
  Object.keys(topics).forEach(function (name) {
    const t = topics[name];
    if (unitTopicNames[name] && !wantedTopics[name] && !topicsInUse[t.topicId]) {
      Classroom.Courses.Topics.remove(courseId, t.topicId);
      log.topicsRemoved++;
    }
  });
  return log;
}

function material_(title, description, url, topicId) {
  return { title: title, description: description, materials: [{ link: { url: url } }], topicId: topicId, state: 'PUBLISHED' };
}

function topicsByName_(courseId) {
  const out = {};
  let pageToken;
  do {
    const res = Classroom.Courses.Topics.list(courseId, { pageSize: 100, pageToken: pageToken });
    (res.topic || []).forEach(function (t) { out[t.name] = t; });
    pageToken = res.nextPageToken;
  } while (pageToken);
  return out;
}

function materialsByMarker_(courseId, prefix) {
  const out = {};
  const re = new RegExp(prefix + ':[A-Za-z0-9-]+');
  let pageToken;
  do {
    const res = Classroom.Courses.CourseWorkMaterials.list(courseId, {
      pageSize: 100, pageToken: pageToken, courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'] });
    (res.courseWorkMaterial || []).forEach(function (m) {
      const match = (m.description || '').match(re);
      if (match) out[match[0]] = m;
    });
    pageToken = res.nextPageToken;
  } while (pageToken);
  return out;
}

/** Dry run: what each course would receive. Creates nothing. */
function previewSync() {
  CONFIG.SUBJECTS.forEach(function (subject) {
    const manifest = JSON.parse(UrlFetchApp.fetch(subject.manifestUrl).getContentText());
    subject.targets.forEach(function (target) {
      const units = manifest.units.filter(function (u) { return target.stages.indexOf(u.stage) !== -1; });
      const n = units.reduce(function (a, u) { return a + u.lessons.length; }, 0);
      Logger.log('COURSE ' + target.name + ' (' + (target.courseId || 'to be created') + '): ' + units.length + ' topics, ' + n + ' lessons');
      units.forEach(function (u) { Logger.log('  ' + (u.topic || u.title) + ' — ' + u.lessons.length); });
    });
  });
}

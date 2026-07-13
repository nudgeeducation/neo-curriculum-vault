#!/usr/bin/env python3
"""Validate nc_ref frontmatter entries against Oak Curriculum Ontology data.

Usage:
    python3 scripts/validate-nc-refs.py <oak-data-file> [more-files...]

<oak-data-file> is one or more Turtle (.ttl) or N-Triples (.nt) files from
https://github.com/oaknational/oak-curriculum-ontology — either a full
distribution file from their releases or individual data/ files.

Checks every `nc_ref` entry under content/ resolves to a subject that
exists in the supplied Oak data. Exits non-zero on any unresolved
reference, so this can run as a CI gate.

No third-party dependencies. See content/_schema/nc-ref-extension.md
for the field specification. Pinned against oak-curriculum-ontology
v0.1.3; Oak URIs are early-release and subject to change — a failing
run after an Oak upgrade is this script doing its job.

Data attribution: Oak National Academy, Open Government Licence v3.0.
"""

import re
import sys
from pathlib import Path

NATCURRIC = "https://w3id.org/uk/oak/curriculum/nationalcurriculum/"
PREFIX = "natcurric:"
REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT = REPO_ROOT / "content"


def collect_nc_refs():
    """Yield (file, ref) for every nc_ref entry in content/ frontmatter."""
    for md in sorted(CONTENT.rglob("*.md")):
        text = md.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("\n---", 3)
        if end == -1:
            continue
        frontmatter = text[3:end]
        in_block = False
        for line in frontmatter.splitlines():
            if re.match(r"^nc_ref:\s*$", line):
                in_block = True
                continue
            if in_block:
                m = re.match(r"^\s+-\s+(\S+)\s*$", line)
                if m:
                    yield md, m.group(1)
                    continue
                in_block = False
            m = re.match(r"^nc_ref:\s*\[(.+)\]\s*$", line)  # inline list form
            if m:
                for ref in m.group(1).split(","):
                    yield md, ref.strip()


def load_oak_subjects(paths):
    """Extract natcurric subject local-names from Turtle / N-Triples files."""
    subjects = set()
    ttl_subject = re.compile(r"^natcurric:([A-Za-z0-9][\w.-]*)\b")
    nt_subject = re.compile(r"^<" + re.escape(NATCURRIC) + r"([\w.-]+)>")
    for path in paths:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            for pattern in (ttl_subject, nt_subject):
                m = pattern.match(line)
                if m:
                    subjects.add(m.group(1))
    return subjects


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    subjects = load_oak_subjects(argv[1:])
    if not subjects:
        print(f"error: no natcurric subjects found in supplied file(s)")
        return 2
    print(f"loaded {len(subjects)} natcurric subjects from Oak data")

    failures = 0
    checked = 0
    for md, ref in collect_nc_refs():
        checked += 1
        rel = md.relative_to(REPO_ROOT)
        if not ref.startswith(PREFIX):
            print(f"FAIL {rel}: '{ref}' — nc_ref entries must use the {PREFIX} prefix")
            failures += 1
            continue
        local = ref[len(PREFIX):]
        if local not in subjects:
            print(f"FAIL {rel}: {ref} not found in Oak data ({NATCURRIC}{local})")
            failures += 1
        else:
            print(f"ok   {rel}: {ref}")

    print(f"\n{checked} nc_ref entries checked, {failures} unresolved")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

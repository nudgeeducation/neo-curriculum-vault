# Local Development Setup

How to run the NEO Curriculum Vault locally for editing and preview before pushing changes.

## Prerequisites

- **Node.js 22 or later** — check with `node --version`
- **npm 10.9 or later** — comes with Node 22
- **Git** — for version control

## First-time setup

From a terminal, in the vault folder:

```bash
cd "$HOME/Documents/Claude/Projects/Nudge Education/neo-curriculum-vault"
npm ci
```

`npm ci` reads `package-lock.json` and installs the exact dependency versions used by the deployed site. First install takes ~2 minutes.

## Build and serve locally

```bash
npx quartz build --serve
```

Then open <http://localhost:8080/> in your browser. Edits to `content/*.md` are picked up live — no rebuild needed for most changes.

## Edit in Obsidian alongside

Open the `content/` folder as an Obsidian vault. Edit notes in Obsidian (graph view, backlinks, search all work natively); the local Quartz preview at <http://localhost:8080/> updates automatically.

When you're happy, commit and push (see [`PUSH_TO_GITHUB.md`](PUSH_TO_GITHUB.md) for the first push, or just `git add . && git commit -m "..." && git push` for subsequent updates).

## Common commands

| Task | Command |
|---|---|
| Install dependencies | `npm ci` |
| Build and serve locally | `npx quartz build --serve` |
| Build only (no server) | `npx quartz build` |
| Format markdown | `npx prettier . --write` |
| Type-check Quartz config | `npm run check` |

## Updating Quartz itself

This vault tracks Quartz 4.5.2 (per `package.json`). To update Quartz to a newer version, follow the [Quartz upgrade guide](https://quartz.jzhao.xyz/upgrading) — usually a `git pull` from the upstream Quartz repo into a sub-tree, then `npm ci` and a local build to verify.

## Troubleshooting

**Build error: "Cannot find module"** — run `npm ci` again; the lockfile may have drifted.

**Wikilinks not resolving in the live site** — Quartz's `CrawlLinks` plugin uses `markdownLinkResolution: "shortest"` so wikilinks like `[[reading]]` resolve to the first matching file. If a link is ambiguous, use the longer form `[[02-curriculum/ks3/english/reading]]`.

**Stale content after editing** — kill the local server (Ctrl+C) and restart with `npx quartz build --serve`.

**Permissions errors when deleting files** — the Cowork sandbox cannot delete some files on the workspace folder; use Finder or your terminal to remove them.

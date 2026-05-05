# Push to nudgeeducation/neo-curriculum-vault

Walkthrough for the first push to GitHub. Run these from your terminal — the Cowork sandbox can't push to GitHub on your behalf, but your terminal has the credentials.

## Prerequisites

You'll need either:

- **GitHub CLI** (`gh`) installed and authenticated, OR
- A personal access token with `repo` scope and your git command-line auth set up

Check `gh`:

```bash
gh auth status
```

If `gh` says you're authenticated, you're good. If not, run `gh auth login` and follow the prompts.

## Steps

### 1. Open a terminal in the vault folder

```bash
cd "$HOME/Documents/Claude/Projects/Nudge Education/neo-curriculum-vault"
```

### 2. Pre-flight cleanup

A handful of files need removing before the initial commit — the Cowork sandbox couldn't delete them because of how the Documents folder mount permissions work, but your terminal can:

```bash
# Remove stray top-level folders that were created in error during scaffolding
rm -rf 02-curriculum 05-resources

# Remove sed-backup files (.md.bak) that the sandbox couldn't delete
find content -name "*.md.bak" -delete

# Verify only canonical content remains
find content -name "*.md.bak" 2>&1 | head -5
# Should produce no output
```

### 3. Verify a local build works

Before pushing, make sure Quartz can build the vault on your machine:

```bash
npm ci
npx quartz build --serve
```

Open <http://localhost:8080/> — if the site renders, you're ready to push. Stop the server with Ctrl+C.

### 4. Initialise git locally

```bash
git init -b main
git add .
git commit -m "Initial commit: NEO Curriculum Vault v0.4

- 250+ markdown files across canonical Curriculum spine, Overlay layer, Cornerstones, Pathways, Areas of Need, and Resources
- Curriculum × Overlay architecture per Tagging Schema v0.3
- Eight subjects fully or substantially populated (English, Maths, Science, Art and Design at KS4; English, Maths, Science, Creative Arts at KS3)
- Both NEO-original courses populated module-by-module (Relating Intelligently and Girls in Green Futures — Verse-ality Certified)
- Four Cornerstones Electives populated
- RSHE statutory branch populated (Relationships Education, Sex Education, Health Education, Online Safety)
- Life-and-Work canonical branch fully populated (six sub-branches, ~30 sub-strands)
- Three overlay branches with content-area-level pages: Edexcel IGCSE, AQA GCSE, Pearson Edexcel Functional Skills
- ASDAN Programmes + Short Courses + Qualifications overlay branches
- KS3 → KS4 precursor net wired across English, Maths, Science, Creative Arts
- Quartz 4.5.2 configured with Nudge brand (navy/teal/cream), en-GB locale, Pages workflow at .github/workflows/deploy.yml"
```

### 5. Create the GitHub repo and push

Using GitHub CLI (recommended):

```bash
gh repo create nudgeeducation/neo-curriculum-vault \
  --public \
  --source=. \
  --push \
  --description "NEO Curriculum Vault — canonical curriculum library for Nudge Education Online. Built with Obsidian + Quartz. Curriculum × Overlay architecture."
```

That command creates the repo under the `nudgeeducation` org, sets the remote, and pushes `main` in one step. If `gh` prompts you to confirm the org, choose `nudgeeducation`.

### 6. Enable GitHub Pages

GitHub Pages needs to be set to "GitHub Actions" as the source so the deploy workflow at `.github/workflows/deploy.yml` runs.

Via CLI:

```bash
gh api -X PUT repos/nudgeeducation/neo-curriculum-vault/pages \
  -f 'build_type=workflow' \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

Or via the web:

1. Go to <https://github.com/nudgeeducation/neo-curriculum-vault/settings/pages>
2. Under "Build and deployment" → "Source", select **GitHub Actions**
3. Save

### 7. Watch the first deploy

The deploy workflow triggers automatically on push to `main`. Watch it run:

```bash
gh run watch
```

Or via the web at <https://github.com/nudgeeducation/neo-curriculum-vault/actions>.

First build takes ~3–4 minutes (npm install + Quartz build + Pages deploy).

### 8. Visit the live site

Once the workflow completes:

<https://nudgeeducation.github.io/neo-curriculum-vault/>

## What to do if the deploy fails

Most common first-push failures:

**"Get Pages site failed"** — Pages not yet enabled. Complete step 6, then re-run the workflow:

```bash
gh workflow run deploy.yml
```

**"npm ci failed"** — usually means `package-lock.json` is missing or the wrong Node version is being used. Verify Node 22 with `node --version` in CI is set in `.github/workflows/deploy.yml` (it is, by default).

**Build error referencing missing file** — usually a wikilink pointing at a file that was renamed or moved. Run `npx quartz build` locally to see the same error and fix the broken link.

## Future updates

Once the initial push is done, future updates are simply:

```bash
git add .
git commit -m "Update <describe what changed>"
git push
```

The deploy workflow re-runs on every push to `main`. Pages site rebuilds in ~3 minutes.

## Working in Obsidian alongside git

You can edit any vault content in Obsidian (open the `content/` folder as a vault). The markdown changes are tracked by git like any other text file. Recommended flow:

1. Edit in Obsidian (or any markdown editor)
2. Build locally with `npx quartz build --serve` to preview at <http://localhost:8080/>
3. Once happy, `git add . && git commit -m "..." && git push`
4. The Pages site rebuilds automatically

## Hybrid public/private split (when you're ready)

The Tagging Schema v0.3 §8.2 specifies a hybrid public/private vault split. The current build publishes everything as public — verbatim spec text from licensed sources is not in the vault, only paraphrased outcome statements, so there's no immediate copyright concern.

When you do want a private side (for OEAS audit packs, verbatim spec text, IP-sensitive material), the pattern is:

- Add `draft: true` to the frontmatter of any page that should not publish
- Quartz's `RemoveDrafts` filter (already enabled in `quartz.config.ts`) keeps those pages out of the public site
- Use a separate private repo or a `private/` folder (already in `ignorePatterns`) for OEAS material that shouldn't leave the school's hands

## Useful repo-management commands

| Task | Command |
|---|---|
| See workflow runs | `gh run list` |
| Re-trigger latest workflow | `gh workflow run deploy.yml` |
| Open repo in browser | `gh repo view --web` |
| Open Pages site | Visit <https://nudgeeducation.github.io/neo-curriculum-vault/> |
| Toggle to private | `gh repo edit --visibility private` |

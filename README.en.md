# Skills

[English](./README.en.md) · [中文](./README.md)

Each skill is a self-contained directory with a `SKILL.md` (the instructions an agent follows) plus optional `scripts/`, `references/`, `assets/`, and `agents/openai.yaml` metadata.

## Catalog

### [git-commit-msg](./git-commit-msg/SKILL.md)

Reads the current repository's uncommitted changes (staged, unstaged, untracked) and produces a single ready-to-copy **English** commit message. Strictly read-only: never runs `git add` / `commit` / `push`, and never asks for command-by-command confirmation.

### [paper-editorial-ui](./paper-editorial-ui/SKILL.md)

Builds or re-skins React + Tailwind marketing and docs sites with the hard-edge "paper + ink line" visual system — paper palette, 1px hairlines, 32px grid, offset hard shadows, mono micro-labels, oversized tight headings. Ships a runnable Vite + React + Tailwind skeleton and a token layer.

### [ui-copy-minimalism](./ui-copy-minimalism/SKILL.md)

Trims interface copy: removes duplicated explanations, sublabels, and decorative text, keeping only what helps users understand, decide, and act — so layout, grouping, and controls carry the explanation.

## Usage

- **Codex / Claude-style agents**: install or symlink a skill directory into your skills root, then invoke it by name (e.g. `$git-commit-msg`).
- **Manual use**: open the skill's `SKILL.md` and follow it as a checklist; run any `scripts/` it references.

## Conventions

- One skill per directory, directory name matches the `name` field in `SKILL.md` frontmatter.
- `SKILL.md` frontmatter: `name` + `description`; the description states both when to use the skill and when not to.
- `agents/openai.yaml` holds `display_name`, `short_description`, and `default_prompt` for UI surfaces.
- Prefer hard rules and explicit steps over prose; keep guidance short enough to be executed, not just read.

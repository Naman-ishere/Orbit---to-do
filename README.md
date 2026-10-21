# Orbit Tasks

A responsive, dark-mode task tracker built with plain HTML, CSS, and TypeScript. No framework or bundler.

## Features
- Add tasks with typed model operations
- Advance tasks through `todo` → `in-progress` → `done`
- Filter by all four status views
- Live task counts, status badges, keyboard-friendly form, responsive layout
- No `any`; strict TypeScript compiler settings

## Run locally
Serve this folder with any static server (ES modules need HTTP, not `file://`). For example:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Compile
Install TypeScript if needed, then run:

```bash
tsc
```

The compiled `app.js` and `model.js` are committed so static hosting can serve the app directly.

## GitHub Pages
1. Push the files to your assignment repository.
2. In **Settings → Pages**, choose **Deploy from a branch**, branch `main` (or your PR branch after merging), folder `/ (root)`.
3. Save and wait for GitHub Pages to publish.
4. Open the displayed URL and test Add, Start, Complete, Reset, and every filter.

> This is a starter implementation. To meet the assignment's “same repository” requirement, copy/merge these files into your Part 1 repository and preserve its original model if its exported types or function signatures differ.

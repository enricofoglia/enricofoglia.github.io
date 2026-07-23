# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website for Enrico Foglia (PhD candidate in aeroacoustics / ML), served via **GitHub Pages** from the repo root. It is a static site — plain HTML, CSS, and vanilla JS with no build step, framework, package manager, or tests.

## Development

There is nothing to build or install. To preview locally, serve the repo root so relative paths resolve:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Deployment happens automatically on push to the branch GitHub Pages is configured to serve (`main`). No CI, linters, or test suite exist.

## Architecture

- **Zero JavaScript.** The landing page relies entirely on native anchor links plus CSS `scroll-behavior: smooth` and per-section `scroll-margin-top` (which clears the sticky header). Do not reintroduce JS for navigation. The only external script anywhere is MathJax, loaded solely on blog posts that contain math.
- [index.html](index.html) is the single landing page. Content lives in one-page `<section>` blocks (`#about`, `#publications`, `#blog`, `#contact`) that the sticky header links to.
- [css/styles.css](css/styles.css) is the **single stylesheet shared by every page**, including blog posts (which link to it via `../../css/styles.css`). It is organised top-to-bottom as: **design tokens → reset → base → layout → components → blog-post page → responsive → reduced-motion**. Everything is driven by CSS custom properties in `:root` — colour, a fluid type scale (`--text-*`), a spacing scale (`--space-*`), and layout widths (`--measure` for reading text, `--content-width` for sections). **Reuse these tokens instead of hardcoding values.** A dark theme is defined by overriding the same tokens under `@media (prefers-color-scheme: dark)`, so new components get dark mode for free as long as they use tokens. Fonts are system stacks only (`--font-sans`, `--font-serif`) — no web-font requests. Classes are component/BEM-style (`.section__label`, `.pub__title`, `.post__abstract`).
- Blog posts live under [html/blog/](html/blog/) as standalone HTML pages. Their header/footer links must reach back up with `../../index.html#...`. Posts with math load **MathJax v3** from a CDN with `$...$` / `$$...$$` delimiters; wrap display equations in their own `<p>` so the `.post-body` spacing applies (see [html/blog/UQ.html](html/blog/UQ.html)).

## Conventions

- **Adding a blog post**: copy `html/blog/UQ.html` as the template (it already wires the shared stylesheet, header, footer, MathJax, and favicon), then add an `<a class="post">` entry to the `.post-list` in the `#blog` section of `index.html`. Put post images under `images/<name>_blog/`.
- **Adding a publication**: add an `<article class="pub">` to the `.pub-list` in `index.html`, following the existing entry (thumbnail, `.pub__title`, `.pub__authors` with `<strong>` around Foglia, `.pub__abstract`, `.pub__links`).
- Assets: images in [images/](images/), PDFs (CV, presentations) in [files/](files/).

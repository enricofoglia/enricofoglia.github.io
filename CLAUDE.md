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

- [index.html](index.html) is the single landing page. All primary content lives in one-page `<section>` blocks (`#quote`, `#about`, `#publications`, `#blog`, `#contact`) that the nav scrolls between.
- [css/styles.css](css/styles.css) is the **single stylesheet shared by every page**, including blog posts (which link to it via `../../css/styles.css`). Design tokens are CSS custom properties in `:root` (colors, `--max-width`, spacing units, `--border-radius`) — reuse these rather than hardcoding values. Class naming follows **BEM** (`.nav__link`, `.profile__content`, `.blog-card-*`). Responsive breakpoints are at `768px` and `480px`.
- [js/scripts.js](js/scripts.js) handles nav behavior only: smooth-scroll to sections, `#cv` opens [files/cv_US.pdf](files/cv_US.pdf) in a new tab instead of scrolling, and hash-based navigation on load/`popstate`.
- Blog posts live under [html/blog/](html/blog/) as standalone HTML pages. Their nav links must reach back up with `../../index.html#...`. Posts with math load **MathJax v3** from a CDN and use `$...$` / `$$...$$` delimiters (see [html/blog/UQ.html](html/blog/UQ.html)).

## Conventions

- **Adding a blog post**: create `html/blog/<name>.html` (copy `UQ.html` as the template — it already wires the shared stylesheet, nav, and MathJax), then add a `.blog-card` `<article>` to the `#blog` grid in `index.html` linking to it. Put post images under `images/<name>_blog/`.
- **Adding a publication**: add a `.publication-card` `<article>` to the `publications-grid` in `index.html`, following the existing card's structure (image, title, authors with `<strong>` around Foglia, abstract, links).
- Assets: images in [images/](images/), PDFs (CV, presentations) in [files/](files/).

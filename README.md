# Sun Soul Style — Warm Minimal Living

An elegant, editorial-style portfolio website built for a boutique furniture and interior design studio. Inspired by the architectural minimalism and quiet luxury of `normcph.com`.

This version of the website is **purely static** (HTML, CSS, and Vanilla JavaScript). It does not require any backend servers or database integrations, ensuring fast load times and clean hosting capabilities.

## Features

- **Adaptive Hero Media**: Swaps dynamically between desktop (`hero-video.mp4`) and mobile-optimized (`hero-mobile.mp4`) background loops depending on the screen size (breakpoint at `768px`). Gracefully falls back to a static poster image (`hero-interior.jpg`) if autoplay fails or is blocked.
- **Editorial Layout**: Spacious margins, generous white-space, and large-format imagery allowing design elements to breathe.
- **Responsive Navigation**: Sticky top header transitions to a blurred solid background on scroll. Automatically collapses into a slide-out drawer on mobile devices.
- **Micro-Animations**: Custom cursor follower with lerp interpolation and hover states. Slow, scroll-triggered fade and slide-up reveals via `IntersectionObserver`.
- **Space Planning Curation**: Framed split section highlighting digital consultation services with a 3D isometric mockup (`kp.png`).
- **Flexible Typography**: Fluid scaling on headings using CSS `clamp()` bounds for seamless rendering from mobile screens up to 4K displays.
- **Color Palette**: Curated sage green, warm ochre, and earthy terracotta accents extracted from the brand's sun-and-wave silhouette line-art logo (`logo.svg`).

## Placeholders Included

Per the specifications, this repository leaves clear placeholders for:
- Hero headlines and brand taglines
- Detailed collection descriptions, titles, and categories
- About/Philosophy body paragraphs
- Contact form input text, phone numbers, email addresses, and location info
- Footer copyright details and brand descriptions

## Getting Started

To view the website locally, open this directory and launch `index.html` in your browser. Alternatively, serve it using any local HTTP static server:

### 1. Python Server
Run the following in the root folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### 2. Node.js (http-server)
Run the following commands:
```bash
npm install -g http-server
http-server .
```

## Project Directory Structure

- `index.html`: Core structure, section divisions, form elements, and markup.
- `css/style.css`: Design system variables, grid masonry, animations, and typography rules.
- `js/main.js`: Scroll logic, hamburger drawer, custom cursor, IntersectionObserver reveals, and viewport video loaders.
- `assets/`: Video assets, vector icons, designer details, and interior lifestyle photographs.

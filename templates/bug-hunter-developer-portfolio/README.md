# Bug Hunter

> A QA engineer portfolio styled as a bug tracker / debugging console. Every section is a "bug report" getting resolved.

## Live Demo

[View Live Demo](https://ethhandy.github.io/portfolio-zoo/bug-hunter/)

## Features

- Status bar with live clock and "bugs squashed" counter that increments as you scroll
- Floating bug emojis drifting up through the background
- Hero with glitch text effect on hover
- Typewriter cycling through QA role titles
- Animated terminal card showing a live "bug scan" with staggered line reveals
- Counting animation for hero stats (2,847 bugs found, 99% squash rate)
- About section styled as a full bug report with metadata, assignee, priority, and JSON code block
- Experience timeline with active/closed status markers
- Skills displayed as "test coverage" percentages with animated fill bars
- "Notable Bug Kills" — trophy cards for biggest catches with severity badges and impact stats
- "SQUASHED" stamp on each bug kill card
- Contact form styled as "File a Bug Report" with priority radio selector
- Scroll reveal with staggered timing
- Fully responsive

## How to Customize

1. **Your info** — Edit name, role, stats, and experience in `index.html`
2. **Bug kills** — Replace the story cards with your own real QA war stories
3. **Skills** — Update `data-width` on `.cov-fill` elements and tool chips
4. **Colors** — All colors are in `:root` in `style.css` — uses a GitHub-dark palette by default
5. **Typewriter roles** — Edit the `roles` array in `script.js`
6. **Contact** — Wire up the form to your backend or Formspree

## Tech Stack

- HTML / CSS / JavaScript (vanilla)
- Google Fonts (JetBrains Mono, Inter)

## License

MIT

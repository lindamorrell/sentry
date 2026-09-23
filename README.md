# Skillforge

A single-page design and motion showcase, served from this repository by GitHub Pages:
**https://lindamorrell.github.io/sentry/**

## What it is

A cinematic record of one batch install: 21 open-source agent repositories were cloned, installed
and verified against reality, then forged into a 532-skill library for an autonomous agent. The page
presents that work as design — and as a film.

- **The film** (`assets/skillforge.mp4`) is not stock footage. It is a [HyperFrames](https://github.com/heygen-com/hyperframes)
  composition — HTML, CSS and one seekable GSAP timeline — rendered frame by frame to
  1920×1080 / 30fps MP4. On the page it is scroll-scrubbed: the clip advances as you read past it,
  and the play button hands control back to normal playback.
- **The inventory** (skill counts, categories, per-repo status) is generated from the real install
  records — `data.js` is written by a script that reads the install reports and the live skill
  directory, not typed by hand.
- **The hero** is a canvas flow field: particles advected through a sinusoidal velocity field,
  pushed away from the pointer, with a lerped custom cursor and magnetic hover on interactive nodes.

## Craft notes

- Zero dependencies, zero CDNs, zero trackers. Every byte — fonts included (`assets/fonts/`,
  Space Grotesk + JetBrains Mono, self-hosted woff2) — is served from this repository.
- Progressive enhancement throughout: the preloader cannot trap the page, the film degrades to a
  poster if video fails, and `prefers-reduced-motion` disables the flow field, the marquee, the
  scroll scrub and every reveal.
- Accessibility: WCAG AA contrast on the film's 62 text elements, keyboard-operable player and
  timeline slider, semantic landmarks, alt/aria labelling on decorative layers.

## Layout

```
index.html        the page
styles.css        design system: palette, type scale, surfaces, motion
app.js            runtime: preloader, cursor, flow field, reveals, film player, charts
data.js           generated data (install reports + live skill inventory)
assets/           film, poster, self-hosted fonts
video/            the HyperFrames composition the film was rendered from
public/           pre-existing files, untouched
```

Typefaces are self-hosted from this repository: **Space Grotesk** (Florian Karsten) and
**JetBrains Mono** (JetBrains), both under the SIL Open Font License 1.1. GSAP is loaded locally
from the composition folder under its own MIT licence.

## Rebuilding the film

```bash
cd video          # the HyperFrames project (source of the MP4)
npx hyperframes lint . && npx hyperframes check .
npx hyperframes render . -o renders/skillforge.mp4 -q delivery
```

The composition contract it follows: sized root, one paused timeline registered on
`window.__timelines`, animation restricted to opacity/transform, finite repeats, no render-time
clocks, and every scene fill on a full-bleed child.

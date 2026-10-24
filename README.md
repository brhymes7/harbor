# Harbor

For Black professionals after a microaggression or a hard day at work. Harbor follows three steps: name what happened (a 20-second check-in), take a short reset (follow it or skip it), and choose what comes next (a private note, a message to someone you trust, or culturally responsive therapist directories). Data stays on the device (no accounts, no server). Peer circles are demo-only.

Built for the tech event demo on Sat Oct 24, 2026. Plan: `~/.claude/plans/lets-plan-this-idea-synchronous-sparkle.md`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm test
npm run build
npm run icons    # re-render PWA icons after editing src/app/icon.svg
```

## Deploy

Netlify builds production from `main` only. Work on branches and merge to `main` when a phase is demo-ready.

Harbor is a wellness tool, not treatment. In crisis, call or text 988.

## Stage demo

Open `/?demo=seed` once to load 9 days of sample check-ins with one grace day. This **replaces** any check-ins on that phone. Delete everything from the Trust page afterward.

## Offline

After the first load, the app fetches every page and its scripts in idle time (`src/app/register-sw.tsx`), so all six resets work in airplane mode. This was verified on 2026-10-22 by stopping the production server: a reset ran, tabs switched, and the `/?source=pwa` start URL loaded.

## Polish gate (2026-10-22)

Walked against `vault/Reference/polish-gate-checklist.md`, the taste playbook §11, and the Emil Kowalski playbook.

| Check | Result |
|---|---|
| Touch targets ≥ 44px | Pass. Reactions were 36px and are now 44px. |
| Text contrast WCAG AA | Pass after a fix. `--ink-3` was 2.83:1 (light) and 3.95:1 (dark). It's now ≥ 4.6:1 on every surface. |
| One primary CTA per screen, in the thumb zone | Pass |
| Labels describe the outcome ("Start the 2-minute reset", "Save check-in") | Pass |
| Unique `<title>` per page, ≤ 60 chars | Pass after a fix. Added a template and per-page titles. |
| OG image, favicon, maskable icons | Pass. The OG image was added. |
| Designed 404, empty, and error states | Pass. The 404 and the empty streak ("Day one…") are designed. Storage failures fail silently. |
| `prefers-reduced-motion` | Pass. Global, and the breathing orb stops scaling while the words and countdown keep pacing. |
| Motion ≤ 300ms for UI, ease-out, no animation on tab switches | Pass. The breath orb is the deliberate exception: its pacing matches the breath. |
| Dark mode: not black, desaturated accent, hairlines | Pass |
| ≤ 2 typefaces, one icon library | Pass. Fraunces + Inter, Lucide at 1.75 stroke. |
| No AI tells (gradients, glass, 3-col icon grids, banned phrases) | Pass |
| No third-party requests | Pass. Every request is same-origin, and fonts are self-hosted by `next/font`. |

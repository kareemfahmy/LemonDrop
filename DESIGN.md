# LemonDrop: design record

The planning artifacts for lemondrop.studio. Later passes must stay consistent with this file.

## Phase 0: Brief

| | |
|---|---|
| Subject | LemonDrop, a digital solutions studio led by Kareem Fahmy (Cairo, working remotely with clients worldwide). Today it ships websites, online stores and interfaces; tomorrow it should be able to ship apps, internal tools and whatever comes next without a rebrand. |
| Audience | Founders, marketing leads and operators at small and mid-size businesses who have an idea or a messy problem and need one partner to plan, design and build it. |
| Job of the site | Make a premium first impression, prove that the studio thinks before it builds, and turn a visit into a project enquiry. |
| Assets | One logo: a white "LD" monogram with a faint paper grain (`public/brand/lemondrop-mark.png`). Nothing else: no photography, no case material, no copy. |
| Language | English. |
| Constraints | Positioning must not be tied to any platform or technology (no Shopify/Framer/Figma in headlines). No invented credentials. |

### Logo, measured (from the alpha channel of the supplied PNG)

The mark is pure geometry on a 522 × 377 box:

| Part | Shape | Box (x, y, w, h) |
|---|---|---|
| L stem | rectangle | 0, 0, 148, 377 |
| L foot | rectangle | 148, 250, 81, 127 |
| D | rectangle 86 wide + a half-disc of radius 188.5 (exactly half the height) | 247, 0, 274.5, 377 |

Gap between the letters: 18 units. Three parts, two straight, one curved. Everything below grows out of that.

### Assumptions (mirrored in `src/data/site.ts` and the final hand-off)

- Studio name LemonDrop, founder Kareem Fahmy, based in Cairo (UTC+2/+3), remote clients. From project memory.
- Domain `lemondrop.studio` and email `hello@lemondrop.studio` are placeholders.
- All four case studies are fictional placeholders (`placeholder: true`). Their client types match real work the studio does (commerce, product UI, brand sites), but names, briefs and outcomes are invented and say so.
- No awards, client logos or metrics anywhere.

## Reference analysis

Captured live in Chromium at 1440 × 900 (Locomotive, The First The Last). Basic and Hobro were unreachable from the build environment (proxy and DNS blocks); Basic is described from prior knowledge and marked as such, Hobro is left out rather than guessed.

| Reference | What makes it work | Principle to extract | What not to take |
|---|---|---|---|
| **locomotive.ca** | Four-corner UI at 13 px (Helvetica Now) under a condensed display face at 70 px. Featured work is a centred, full-width index of client names between hairlines. A statement paragraph at display size does the "about". Tiny glyph flourishes (®, *loco, ⌒) give it a voice. Stark white field against one saturated full-bleed image. | Type is the structure; work as an index; one statement paragraph instead of a wall of services; personality through small marks. | Their condensed serif-ish display, the emoji jokes, the red. |
| **thefirstthelast.agency** | One neo-grotesk (TWK Lausanne) carries everything, display at 109 px with -0.04 em tracking, ink #232323 on #f8f8f8. A loader with a 100% counter and floating keyword tags. Giant ghosted words ("360 Agency", "Our works") sit behind centred statements as a background layer. Pastel tags label things. | A loader that is an identity moment; one family with strong tracking discipline; layered type (big quiet word behind, small clear sentence in front). | Floating sticky-note tags, pastels, the centred-everything layout. |
| **basicagency.com** (memory, not captured) | Case studies told as stories with full-bleed media, bold grotesk, black and white chrome so the work brings the colour, a "View" cursor, very little copy per screen. | Let the work carry colour; each case explains problem, idea, outcome. | Video-heavy hero (we have no footage), the cursor label. |
| **hobro.digital** | Not analysed: the site never loaded here (blank black render headless, DNS blocked for fetch). | | |

Combined principles for LemonDrop: a monochrome system where one element brings the colour, type as structure, work as an index, a loader that builds the identity, and layered type. The original idea has to come from LemonDrop itself, not from these.

## Phase 1: Concepts

| | A. Kit of parts (identity) | B. The press (name) | C. Cairo shift (place) |
|---|---|---|---|
| Idea | The LD mark is built from three parts: a block, a step and a drop. The site shows every project being built the same way: the mark comes apart into its parts, each part is one discipline, and they lock back together when the work ships. | A lemon drop is what is left when you squeeze. The page starts as a cloud of messy brief words and scroll presses it into one clear sentence and one drop. | The studio works from Cairo while many clients sleep. The site runs on Cairo time: light, copy and status follow the real hour there. |
| Anchor | The measured geometry of the supplied logo (148/81/274.5 units, the half-disc radius = half the height). | The name, plus the brief's "turn complex ideas into meaningful experiences". | Founder's real location and async remote working. |
| Layout rule | Exploded-assembly drawings: pieces on a grid with dimension labels; square corners, one curve. | Dense to sparse: every section has fewer words than the last. | A day strip across the site; sections are hours. |
| Motion verb | slide and lock; the drop rolls | press, condense, drip | drift with the sun |
| Signature | Sticky hero where the mark explodes into labelled parts per discipline and re-assembles (driver: scroll progress + pointer + idle breath). | Word cloud compressed into one line on scroll. | Real-time sky gradient over Cairo hours. |
| Screenshot | The giant mark exploded into three labelled parts, the yellow drop rolled out to the right. | One sentence and a drop under 400 crushed words. | A night-blue hero reading "It is 02:14 in Cairo. We are asleep." |
| O / F / Fe / P | 4 / 5 / 4 / 1 | 3 / 4 / 3 / 3 | 3 / 3 / 4 / 3 |

**Pick A.** It is literally built from LemonDrop's own mark, so it cannot be moved to another studio, and "we break your idea into parts and build each properly" is the positioning in one picture. It stays platform-agnostic: the parts are disciplines, not tools.

Steal from B for the 404 and the contact page (the press: a brief condensing into one line). Steal from C for the footer: the real Cairo time, because it tells a remote client when they will hear back.

### Concept Card

```
Idea:        Every project is built like our mark: a block, a step and a drop, assembled properly.
Metaphor:    An exploded assembly drawing (the parts of a thing, labelled, pulled apart, then locked together).
Signature:   The hero mark explodes into its three labelled parts as you scroll, each part lights up with its
             discipline (Strategy = block, Design = drop, Engineering = step), then the parts lock back into
             LD when the work ships. Recipe: motion.md "Pinned chapters" on a sticky stage (patterns.md 2),
             driven by one driver module (patterns.md 1) with pointer and idle inputs.
Emotion:     Calm confidence. "These people take things apart before they build them."
Motion verb: Slide and lock. Straight parts slide on one axis and stop hard; the drop rolls.
Screenshot:  The mark exploded across the dark hero, the yellow drop rolled out to the right, dimension
             labels beside each part.
```

The concept must survive to the footer, the case pages and the 404:
- Loader: the parts arrive one by one and lock into the mark as the assets load.
- Page transition: a D-shaped panel rolls across the screen, ink body, yellow bowl leading.
- Primary button: a D (square left, round right). On hover the yellow drop rolls in and floods it.
- Work index: the preview is cut into a D and follows the pointer.
- Case covers: each project gets its own arrangement of the three parts in its own colours (honest generative art, no fake screenshots).
- 404: the parts lie scattered and unassembled.
- Footer: the parts rest in the mark and lean toward the pointer.

## Phase 2: Art direction system

### Palette

| Role | Name | Hex | Use |
|---|---|---|---|
| ground (light) | Paper | `#EFEFEC` | light sections |
| ink | Pith | `#111110` | text on light, dark sections, curtain |
| muted (light) | Rind | `#5C5C57` | secondary text on paper (6.2:1) |
| muted (dark) | Ash | `#9C9C95` | secondary text on pith (7.0:1) |
| line | | `rgb(17 17 16 / 0.16)` / `rgb(239 239 236 / 0.18)` | hairlines |
| accent | Lemon | `#FFD829` | **only** the drop: the half-disc, the D-button flood, the transition bowl, selection |

Rule: yellow is never text and never decoration. If something is yellow, it is the drop. Pith on lemon is 13.9:1 for button labels in the flooded state.

Why not the AI-default "black + one acid accent": the site is mostly paper-light, the accent is a shape not a highlight, and it carries meaning (the drop in LemonDrop).

### Type

| Role | Family | Source | Setting |
|---|---|---|---|
| Display | Archivo (variable, wght + wdth) | Google, via next/font | wght 780, wdth 112 (expanded): heavy and wide like the mark's 148-unit stem. Tracking -0.045 em at mega, -0.03 em at xl, leading 0.86 to 0.92. The width axis is kinetic: chapter titles stretch from wdth 90 to 112 as they lock. |
| Text and UI | Host Grotesk 400 / 500 | Google, via next/font (Fontshare, the first choice for Switzer, is blocked from the build network) | Body 17 to 18 px / 1.5. UI 13 to 14 px, tracking +0.01 em. Tabular figures for years, time and counters. |

Scale: mega `clamp(3.5rem, 0.6rem + 12.5vw, 14rem)`, xl `clamp(2.4rem, 1.2rem + 5vw, 6.25rem)`, l `clamp(1.6rem, 1.1rem + 2.1vw, 3.1rem)`, m `clamp(1.2rem, 1.05rem + 0.6vw, 1.6rem)`.

### Grid and rhythm

- 12 columns desktop, 6 tablet, 4 phone. Gutter `clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`, outer margin = gutter.
- Three hang lines: column 1, column 5 and column 8. Every text block starts on one of them.
- Section rhythm moods: tight (8u), normal (16u), airy (28u), full (100svh). Assigned per section below.

### Shape

Corners are square. The only curve on the site is the half-disc, always a full semicircle (radius = half the height). Buttons are D-shapes: `border-radius: 0 999px 999px 0`.

### Motion language

- Eases: engine `ease.out` (expo.out) for entrances and locks, `ease.inOut` (expo.inOut) for the curtain, `ease.soft` (power3.out) for hovers.
- Slide and lock: straight pieces move on one axis only (never diagonal), 0.9 to 1.2 s, stop hard on expo.out.
- The drop rolls: when the half-disc travels it rotates as if rolling (angle = distance / radius).
- Hovers 0.35 to 0.5 s. Stagger 40 to 60 ms. Big things slower than small things.
- Idle: the exploded gap breathes (±1.5% of the gap, 7 s period) and each part leans toward the pointer by its depth (block 4 px, step 7 px, drop 10 px). Paused off screen, zero under reduced motion.

### Interaction treatments (one per role)

| Role | Treatment |
|---|---|
| Primary CTA (D-button) | yellow drop rolls in from the round end and floods the button; label slides one line |
| Nav links | letter roll inside a clipped line; current page keeps a small drop marker |
| Work rows | title slides right one step (24 px) and a drop marker locks in at the row start; D-shaped preview follows the pointer |
| Inline links | underline at rest, rises into a band on hover |
| Utility (social, legal) | colour only |
| Arrows | nudge 5 px along their direction |

### Tone (background) system

Sections declare `data-tone="dark|light"`. One driver flips `html[data-tone]` when a section crosses the middle of the viewport, and `--bg` / `--fg` / `--muted` / `--line` follow. All text reads those variables, so every state stays readable. Without JS, each section paints its own tone.

### WebGL

None. The concept is crisp geometry, best served by SVG + GSAP transforms (cheap on phones, perfectly sharp at any size). The paper grain from the original logo comes back as one static SVG noise layer. Recorded as a deliberate decision.

### Composition plan (home)

```
1. KIT HERO + CHAPTERS (dark, full + 4 x 100svh, sticky stage)       family: sticky narrative / poster
┌──────────────────────────────────────────────────────────────────┐
│ [LD] LemonDrop                       Work  Studio  Contact  (Start ▶)│
│                                                                    │
│                                   ┌──────┐     ┌───╮               │
│                                   │ A    │     │ C  ╲  sticky mark │
│                                   │block │     │drop │ exploded by │
│                                   │      │┌──┐ │    ╱  chapter     │
│                                   └──────┘└B─┘ └───╯               │
│ Complex ideas, broken into                                         │
│ parts and built properly.          (h1, col 1-7, t-xl)              │
│ intro line col 1-5             meta col 8-12: what / where / time   │
└──────────────────────────────────────────────────────────────────┘
  then chapters scroll on the left (col 1-5): Strategy / Design / Engineering / Shipped
  while the mark explodes, lights one part per chapter, then locks.

2. STATEMENT (light, airy)                                             family: statement
│   Most digital projects break in the gaps between strategy, design   │
│   and code. We own all three, so the idea you approved is the one    │
│   that ships.                    (t-l, col 1-10, hang col 1)         │

3. SELECTED WORK (light, normal)                                       family: index list
│ Selected work                                         4 projects    │
│ ─────────────────────────────────────────────────────────────────  │
│ Second Hand        Commerce · Pre-owned watches     2026    ◗preview│
│ ─────────────────────────────────────────────────────────────────  │
│ Baseload           Product · Energy monitoring      2025            │
│ ...                                                                │
│ All work ▶                                                         │

4. CAPABILITIES (light, normal)                                        family: asymmetric pair
│ What we make        │ Websites and platforms ......... short line    │
│ (col 1-4, sticky)   │ Online stores .................. short line    │
│                     │ Product and app interfaces ..... short line    │
│                     │ Brand systems for screens ...... short line    │
│                     │ Design systems ................. short line    │
│                     │ Care and growth ................ short line    │

5. FOOTER FINALE (dark, full)                                          family: footer as finale
│ Have an idea that needs                                            │
│ taking apart?           (t-xl)           (Start a project ▶)        │
│ hello@… · Cairo 14:32 (replies within one working day)             │
│ [ giant LD mark, parts resting, leaning to pointer ]               │
│ © 2026 LemonDrop   Instagram  LinkedIn  Dribbble        Colophon   │
```

Inner pages:
- `/work`: poster title "Work" at mega, then the index with inline covers (gallery wall of kit covers on desktop, single column on phone).
- `/work/[slug]`: title + one-line summary, meta grid, kit cover full-bleed, Context / Idea / Craft (palette and flow schematics, labelled as schematics) / Outcome, next project.
- `/studio`: statement, the three parts as a method (static exploded diagrams), capabilities in detail, founder note, how an engagement runs (a real sequence, so numbered), CTA.
- `/contact`: a brief builder (choose what you need, timeline, budget range) that writes the email for you; the press from concept B condenses the choices into one line.
- `/404`: the parts scattered: "This page was never assembled."

### Genericness test

| Would a generic model land here? | Change |
|---|---|
| Yellow + black "lemon" brand with a lemon illustration and a juicy gradient | No fruit imagery at all; yellow is restricted to one geometric part. |
| Floating random Bauhaus shapes | Only the three measured parts of the actual mark, at their real proportions, with dimension labels. |
| Three equal service cards | Services are the parts of the mark in a sticky exploded drawing; the rest is a hairline list. |
| Rounded SaaS buttons | D-shaped buttons from the logo's own curve. |
| Fade-up on every section | Pieces slide on one axis and lock; reveals limited to headings and the kit. |

### Motion at rest (decision)

The concept breathes where the mark is on screen: the home hero and chapters (parts breathe and lean toward the pointer), the footer mark on every page, and the 404's scattered parts. The inner pages (work index, case studies, studio, contact) are deliberately still between interactions: their life is in the hovers (D-button flood, card corner turning into a D, row slide and drop marker) and the footer. `idleMotion: false` on those pages is expected.

### Changes made during QA

- Pass 0: header now steps aside on scroll down, returns only after a deliberate scroll up (80 px), and returns on a solid band in the section's tone, so it never sits on type.
- Pass 0: lit parts no longer fade through half-opacity (muddy olive on pith). A lit part now fills from the bottom inside its outline, like liquid rising: the lemon literally fills the drop.
- Pass 0: phone hero tightened (title follows the mark instead of floating at the bottom of an empty screen).
- Pass 1: loader timed from navigation start (it is visible from first paint); on slow devices that boot late it skips the counting and fades. Desktop loader went from 2.7-3.1 s to 2.1 s.
- Pass 1: logo hover added (the mark comes apart a little and locks back), inline email link tap target raised to 24 px.
- Pass 1: page-head gutter bug fixed; phone grid no longer creates phantom columns; 404 recomposed so the title and the scattered parts share the first screen.
- Jury pass (critic 7.25): phones skip the loader (no counter to wait on, first paint is the real page, intro does not replay); larger screens play it once per session. Kit chapters now map to their measured positions, so on phones each chapter's copy follows directly under the sticky mark (removed about 900 px of empty black). The drop no longer tilts at rest. Work preview anchored over the right-hand columns so titles and clients stay readable. Logo hover separation made legible at 22 px. Statement paragraph hangs from its own line. Page heads without meta put the lede under the title. Caption grey darkened to #4D4D49. Phone 404 and dimension labels fit at 390 px (key letters only).

## Upgrade pass (branch `fable-upgrade`)

Technique reference: hobro.digital, read from frames of a screen recording (the site sits behind a bot check). Used for motion technique only: masked text scrubbed to scroll, visuals that appear on separate clocks, an in-place character scramble. No layout, copy, assets or code were taken. Its particle field, image collage, clients list and italic serif accent were left out on purpose; the serif would add a second curve vocabulary to a system built on one.

This pass supersedes the earlier sections where they disagree:

| Area | Before | Now |
|---|---|---|
| Home, first screen | The kit: mark on the right, h1 on the left | A video hero: footage under a centred h1 (`--t-hero-xl`), pause control bottom right. The kit follows as the second section, driver and drawing untouched; its first screen has its own short intro ("Every project is built like our mark."). The tag lists under the kit chapters are removed. |
| Loader | Once per session; the mark flies to the hero mark | Plays on every full page load, refresh included (phones skip it; in-site navigation uses the curtain). Timed from when it starts: count at least 1.8 s, 0.3 s hold on the assembled mark, about 3.3 s in all. The mark shrinks into the header logo, taking the logo's colour for the page tone while the ink ground clears. |
| Type | Archivo (expanded, 780) for display, Host Grotesk for text | Inter and Geist Mono, after a second reference the client supplied. Headlines: Inter 800, uppercase, tight. Body: Inter, sentence case. The small voice (labels, navigation, buttons, captions, dimensions, data): Geist Mono, 12 px, uppercase; section labels in brackets. |
| Text reveals | Play once on enter | Still one move everywhere: text rises once from behind its line mask and stays. A scroll-scrubbed variant was tried on headlines and removed: mixing the two read as inconsistent. |
| Why one studio (home) | One paragraph in a wide margin | A full-screen statement: a headline ("One studio. No handovers.") with the reasoning beside it. It holds while the next sheet slides over it. Two livelier versions were tried and dropped; the second, a figure that closed its gaps on scroll, repeated the kit above it. |
| Section order (home) | Hero, kit, statement, work, services | Hero ("LemonDrop" as the headline, rising letter by letter as the loader uncovers it; logo is mark-only), who we are (dark), services (light), work (light). The kit is parked: not rendered, but its component, drawing and driver are intact and a comment in `src/app/page.tsx` marks where to render it again. A stacked-sheet transition, a dark-to-light shift and a Planned / Designed / Built type band were each built and removed at the client's request. |
| Who we are (home) | "One studio. No handovers." | New copy. A full screen of dark ground: headline left, paragraph right, centred as a pair. Both rise line by line once. The D at the end of the paragraph grows out from its flat side as a lemon outline, then fills from the bottom. Tried and removed: a large rolling drop; a held, scaling block (stuttered); clipping the hero video to a D on the way out (costly per frame). |
| Between sections (home) | Nothing | Statement to services: the change of ground, dark to light. Services to work: a dimension line that draws across with the drop rolling along it, labelled with the section it leads into. |
| What we make, title | A plain heading | Three words on three baselines: "We" and "Make" solid, "What" an italic outline on top that inverts where it crosses them. Each drifts sideways at its own speed while the title is on screen (scrubbed), after the "What we do" title in the client's reference recording. Inter italic, not the reference's serif. This is the one scroll-scrubbed text effect on the site. |
| Selected work (home) | Text index with a hover preview | Four portrait plates as the only way into the projects. Each grows from a small window in its own corner to full size, on its own delay and duration (`data-reveal="appear"`); it plays once in view, resets when fully off screen and replays on re-entry. The text index and its preview are removed. |
| What we make (home) | Hairline list beside a sticky heading | Six rows in regular weight and Title Case, well under the heading's size, and a lemon drop that marks your place: it rolls to the row at the middle of the screen as you scroll, one full turn per row, and that row comes to full strength. Scroll is the only input (a hover version fought the scroll and was removed). Each row links to the contact page with that need preselected (`?need=`). |
| Footer | Headline, small button, a second screen of the assembled mark | One compact section in two halves. Left: the question, the D button (floods with lemon on hover or focus; its label assembles from the three parts) and the contact line. Right: the bench, the mark as three loose parts to drag onto a dashed outline; building it floods the button. On /contact the button offers "See the work" instead of pointing at its own page. |

The earlier Type table, the width-axis notes in the motion section and the "work as an index" principle no longer apply.

Still held: yellow is only ever the drop (the scramble's drop glyph and the footer flood are both the drop); square corners and one curve; parts move on one axis with no bounce; no fake screenshots; no platform names in headlines; no WebGL; one easing vocabulary (scrubbed tweens use `none`, the scrub lag supplies the landing).

Centred type in the hero breaks the three-hang-line rule on purpose: it is the one poster moment.

### Hero footage

The studio's own footage, supplied with a commercial licence: two edits (Hero 1, Hero 2) joined into one loop. The rifle shot in Hero 1 (4.13 to 5.47 s) is cut. Hero 1 cross-fades into Hero 2 over 0.8 s, and the end of the loop is folded into its start with the same 0.8 s cross-fade, so the loop has no visible seam. Result: 10.6 s, 1652 × 994, 60 fps, no audio.

- `public/hero/hero.mp4`: desktop, native resolution, H.264 CRF 18 (6.7 MB). Measured against the near-lossless master: SSIM 0.995, PSNR 50.9 dB, visually identical.
- `public/hero/hero-mobile.mp4`: phones (max-width 767 px), 1280 px wide, CRF 19 (3.6 MB).
- `public/hero/hero-poster.jpg`: first frame, shown before playback, under reduced motion and on data saver.
- To replace: keep the same three file names, or update `hero.video` in `src/data/site.ts`.

### Project imagery (placeholders in place)

Every project visual is still the generated `KitCover`. Per project, supply:

- Portrait 4:5 at 1920 × 2400 for the home plates.
- Landscape 4:3 at 2400 × 1800 for the /work wall, the case page cover, the hover preview and the phone row cover.
- sRGB. PNG for interface shots, JPG at quality 90 or higher for photography. Subject inside the central 80%: the hover state rounds the right edge into a D.
- Optional loop per project: MP4 (H.264), 1600 px wide, 6 to 10 s, no audio, under 3 MB, same aspect ratio as its slot.

### Verification

- The four kit chapters were screenshotted in the old and new builds under reduced motion: pixel-identical on desktop (1440 × 900); on a 390 px phone the drawing and copy match, and the only difference is the intro text above chapter 1, which changed on purpose.
- Reduced motion: no smooth scroll, no scrub, no scramble, no autoplay (the pause control becomes "Play video"); all content visible.

## Hero: the window (concept card)

```
Idea:        You first see the work through our mark; then the mark comes apart and the work fills the screen.
Metaphor:    A stencil / a cut-out. The mark is a window onto the footage, then a door.
Signature:   As the loader hands its mark to the header, the hero is an ink sheet with the LD mark cut out
             of it, as large as the screen allows, so the full-screen footage shows only through the three
             parts. The parts then slide apart on their own axes (block left, step down, drop rolling right)
             while the mark grows and the ink lifts, opening the footage edge to edge; the name rises along
             the bottom. Recipe: SVG mask (src/components/Hero.tsx) driven by one GSAP timeline
             (src/motion/setup.ts, windowOpen), removed when done so nothing is masked during scroll.
Emotion:     A held breath, then the screen opens.
Motion verb: Slide and lock, run in reverse: the parts that assemble in the loader take themselves apart.
Screenshot:  Black screen, a giant LD cut out of it, the footage glowing through the letters.
```

Composition: full-bleed footage under a shade that is open in the middle and ink at the foot; the name LEMONDROP edge to edge along the bottom; the description above it on the right; meta, scroll cue and pause control in the bottom row. Phones skip the loader and play the window on first paint, with the mark sized to the screen width. Reduced motion and no JS: no window, poster and type shown at once.

Concepts considered: (A) the window, chosen: anchored in the mark's three parts and the loader that assembles them, so it cannot move to another studio. (B) a liquid drop lens following the pointer over the footage: WebGL cost on phones for a pointer-only effect. (C) the footage inside the giant word: a well-worn knockout-text trope.

QA (production build): desktop LCP 0.2 s, CLS 0; throttled phone LCP 0.76 s, CLS 0.07 in the harness (no shifts reproduced unthrottled, likely the font swap on the edge-to-edge name). Loader 3.3 to 3.6 s, longer than the skill's 2.6 s cap, by the client's request. Scroll through the hero at a steady 60 fps.

## Loader (current)

Every full page load (phones skip it): the screen is ink with the mark cut out of it, so the page shows through the letters (on home, the playing footage; on other pages the cut-out is tinted so a light page reads as glass, not solid paper). The letters start off screen on opposite sides and travel in to meet: the L slides in from the left edge, the D rolls in from the right edge, and they lock in the middle (0 to 48% of the real load progress). From 40% both letters fill with paper from the bottom up. The 0 to 100 counter, the note and a bar run along the bottom. At 100 the counter drops away, the ink lifts off the page and the solid white mark flies into the header logo (1.05 s, power3.inOut), which takes over. On home the hero intro then plays over the footage. Navigating to home inside the site: the curtain, then the hero window opening. Pace: `COUNT_MIN` in `src/engine/loader.ts` (2.2 s).

## Footer (current)

After the client's reference recording (a studio footer revealed from beneath the page, with a dot-matrix image and a huge dim wordmark). In LemonDrop's terms: the footer is sticky at the bottom under the content, so the page lifts off it. Three columns of small type: the ask with its action and two status lines (tiny drops, the live one blinking), the site map (a drop marker slides in on hover), contact with the live Cairo time. Then the field: the L and the D drawn in dots on a canvas, one each side, sliding toward each other as the footer is revealed; the dots shimmer at rest, scatter from the pointer and glow lemon near it (setup.ts, footerField). Legal lines sit in the gap. LEMONDROP closes the page, huge, dim (#2a2a28) and cut by the bottom edge. Phones: not sticky, columns stacked, legal under the dots. Reduced motion: one still frame. The big D button, the scramble and the two-piece bench are removed.

## Reel (between services and work)

After the client's reference (a yellow section whose huge word runs sideways with the scroll). Replaces the dimension-line separator. A full screen of lemon, pinned while its track runs sideways (scrubbed): SELECTED WORK in huge ink type is the heading of the work section, and the four project covers drift over it at their own speeds (each a link to its case study). Lemon is used as a ground here, a deliberate exception to "yellow is only the drop", at the client's request. Reduced motion: not pinned, the title wraps, the covers are left to the plates below.

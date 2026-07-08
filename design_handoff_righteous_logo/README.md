# Handoff: Righteous Studios Logo — "The Backspace" ([r] studios)

## Overview
The Righteous Studios logo is an animated typographic mark. The full wordmark `[righteous]` backspaces letter by letter — the closing bracket trailing in like a horizontal text cursor — and comes to rest as `[r]`, forming the final lockup **[r] studios**. The resting closing bracket blinks like a cursor. The static logo is `[r] studios`; the animation is for the website header, loading states, and brand moments.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. Recreate them in the target codebase's existing environment (React, Vue, plain JS, etc.) using its established patterns. If no environment exists yet, choose whatever fits the project; the reference implementation is dependency-free vanilla JS and trivially portable.

## Fidelity
**High-fidelity.** Colors, typography, spacing ratios, and animation timings are final. Recreate exactly.

## The Mark

### Static lockup: `[r] studios`
- Two baseline-aligned parts in a row (flex, `align-items: baseline`):
  1. **Bracket mark** — the text `[r]` (rest state) / `[righteous]` (full state)
     - Font: Helvetica Neue Bold — `font-weight: 700; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif`
     - Lowercase always
     - `letter-spacing: -0.02em; line-height: 1`
  2. **"studios"** — lowercase, same family/weight
     - Font size ≈ **0.29×** the bracket mark's font size (e.g. 15px at 52px)
     - `letter-spacing: 0.5em`
- Gap between the two parts ≈ **0.27em** of the bracket font size (14px at 52px)

### Colors
- Ink: `#141414`
- Light background: `#FAFAF7` (warm off-white)
- Dark mode: ink becomes `#FFFFFF` on `#141414`
- No other colors. One accent may be introduced later by swapping the ink value globally.

### App icon / favicon
- Solid `#141414` square, white `[r]` centered
- Corner radius: **8%** of icon size (chosen; a 26% rounded variant was explored)
- `[r]` font size ≈ 42% of icon size, weight 700, letter-spacing -0.02em
- Sizes to generate: 512, 192, 180 (apple-touch), 48, 32, 16

## Animation — "The Backspace" (looping)
The word inside the brackets is a state string; the closing bracket `]` and `studios` sit after it and slide left as characters are removed (natural inline flow — no absolute positioning).

Timeline (loop forever):
1. **Full hold** — show `[righteous]`, hold **2000ms**. Closing bracket blinks while holding.
2. **Erase** — remove one character from the end every **110ms**, down to `r` (9 → 1 chars). Bracket solid while moving.
3. **Rest** — hold `[r]` for **2600ms**. Closing bracket blinks.
4. **Retype** — add one character back every **90ms** up to `righteous`. Bracket solid.

Blink: closing bracket toggles `opacity` between 1 and 0 every **530ms**, only during holds (steps 1 and 3). Always reset to visible (opacity 1) when motion starts.

`studios` remains fully opaque and static in style throughout; it only translates left/right as the layout reflows.

### One-shot variant (e.g. splash / intro)
Run steps 1–3 once and stay at `[r] studios`. Recommended for first page load; loop version for idle/brand moments only.

### Accessibility
- Respect `prefers-reduced-motion: reduce` — render the static `[r] studios` lockup, no animation, bracket solid.
- The animated element should expose a stable accessible name: `aria-label="Righteous Studios"`, with the changing text `aria-hidden` inside.

## State Management
- `txt: string` — current word inside brackets (`'righteous'` → `'r'`)
- `blink: boolean` — closing-bracket visibility
- `holding: boolean` — whether blinking is active (guard for blink interval)
- Timers must be cleaned up on unmount.

## Design Tokens
- `--ink: #141414`
- `--bg-light: #FAFAF7`
- `--bg-dark: #141414`
- `--icon-radius: 8%`
- Font: Helvetica Neue 700 (system; no webfont needed)
- Timings: hold 2000ms · erase 110ms/char · rest 2600ms · retype 90ms/char · blink 530ms

## Minimum sizes (from scale testing)
- Header lockup: bracket mark ≥ 15px font size
- Favicon 16px: `[r]` at ~7px still reads; below that use bare `r`

## Assets
No external assets. The mark is pure type (system Helvetica) — generate icon PNGs/SVGs from the spec above.

## Files
- `logo-reference.html` — dependency-free vanilla HTML/JS reference implementation of the animated mark (light + dark, exact timings). Open in a browser to see intended behavior.
- `Righteous Logo Explorations.dc.html` — the original design exploration sheet; **round 3 / card 3a** is the chosen direction. Earlier rounds are history, not spec.

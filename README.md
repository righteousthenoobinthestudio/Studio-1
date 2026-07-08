# Briefed

Memorise your Rules of Professional Conduct (RPC 2023) with ease.

A single-file, no-dependency web app for drilling all 78 rules of the Rules of
Professional Conduct for Legal Practitioners. Open `rules-trainer.html` in any
browser — it works offline.

## Games

- **Quiz** — multiple choice, both directions (number → rule, rule → number)
- **Match** — pair rule numbers with their titles
- **Order** — tap the rules in numerical sequence
- **Cards** — self-graded flashcards
- **Type** — type each rule's title from memory; graded close-to-exact at the end

## Features

- Study by section (collapsible ribbon: Practice, Clients, Court, AML, and more)
- Choose your round length: 5, 10, 15, or the whole set
- Spaced repetition: rules you miss come back sooner (1h → 1d → 3d → 7d),
  with a "due for review" banner and return-time prompts
- Per-round scoring with streak bonuses
- Light and dark mode

# Righteous Studios logo

`components/righteous-logo.js` implements the animated **[r] studios** wordmark
("The Backspace") as a dependency-free web component, per the spec in
`design_handoff_righteous_logo/README.md`.

```html
<script src="components/righteous-logo.js"></script>

<righteous-logo></righteous-logo>                 <!-- loop forever, 52px -->
<righteous-logo size="24"></righteous-logo>       <!-- bracket mark size in px (min 15) -->
<righteous-logo mode="once"></righteous-logo>     <!-- backspace once, rest at [r] studios -->
```

The mark inherits `currentColor` — set `color: #141414` on light backgrounds or
`#FFFFFF` on dark. Respects `prefers-reduced-motion` (renders the static
lockup). See `components/righteous-logo-demo.html` for a live demo.
